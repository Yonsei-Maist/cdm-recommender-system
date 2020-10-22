import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { MarkedWord } from '../../formats/markedWord';
import WordService from '../../api/wordService';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import 'quill/dist/quill.core.css';

Quill.register(
    {
        'formats/markedWord': MarkedWord,
    },
    true
);

const Delta = Quill.import('delta');

const EditorWithMarkedWordFeature = () => {
    const [editorHtml, setEditorHtml] = useState('');
    // Quill instance
    const [quillRef, setQuillRef] = useState(null);
    // ReactQuill component
    const [reactQuillRef, setReactQuillRef] = useState(null);

    const userInputText = useSelector((state) => state.userData.inputText);
    const contentFromRedux = useSelector((state) => state.content);

    useEffect(() => {
        setEditorHtml(generateText(contentFromRedux));
    }, [contentFromRedux]);

    const generateText = (content) => {
        const arrayWords = content.arr_words.map((word) => {
            return word.str_text;
        });
        return arrayWords.join('');
    };

    useEffect(() => {
        if (
            reactQuillRef == null ||
            (reactQuillRef != null &&
                typeof reactQuillRef.getEditor !== 'function')
        )
            return;
        setQuillRef(reactQuillRef.getEditor());
    }, [reactQuillRef]);

    const handleOnChange = async (content, delta, source, editor) => {
        setEditorHtml(content);

        console.log('========== handleOnChange ==========');
        console.log('editor getContents: ', editor.getContents());
        if (
            reactQuillRef == null ||
            typeof reactQuillRef.getEditor !== 'function'
        )
            return;
        console.log(
            'handleChange, contents:',
            reactQuillRef.getEditor().getContents()
        );

        console.log('>>editor html: ', editorHtml);
        console.log('>>content: ');
        console.log(content);
        console.log(quillRef);
        console.log(editor);

        // when user click on load data which update the contentFromRedux
        const isLoadData =
            // when userInputText from redux state, editor empty
            (delta.ops.length === 1 &&
                delta.ops[0].insert &&
                source === Quill.sources.API) ||
            // when userInputText from redux state, editor not empty
            (delta.ops.length === 2 &&
                delta.ops[0].insert &&
                delta.ops[1].delete &&
                source === Quill.sources.API);
        // editor.getSelection() is null when user pasts text
        const isPastText = editor.getSelection() == null;

        if (isPastText || isLoadData) {
            triggerOnChange1(editor, delta, quillRef, isLoadData);
        }

        // When user insert or delete text
        if (
            // editor.getSelection() is null when user pasts text
            // should handle by the Clipboard Module: Auto format on paste
            editor.getSelection() !== null &&
            // when insert the begining of the text area
            ((delta.ops.length === 1 &&
                (delta.ops[0].insert || delta.ops[0].delete) &&
                source === Quill.sources.USER) ||
                // when insert or delete letter
                (delta.ops.length === 2 &&
                    delta.ops[0].retain &&
                    (delta.ops[1].insert || delta.ops[1].delete) &&
                    source === Quill.sources.USER))
        ) {
            console.log('+++++++++++++++++++++++++++++++++++++++++++++');
            console.log(editor.getSelection());
            triggerOnChange2(editor, delta, quillRef);
        }

        //triggerOnChange(editor, delta, source, quillRef, contentFromRedux);
    };

    const triggerOnChange1 = async (editor, delta, quillRef, isLoadData) => {
        console.log(
            '-------------------------------- triggerOnChange1 --------------------------------'
        );
        const text = editor.getText();
        console.log(text);
        // https://stackoverflow.com/questions/40881365/split-a-string-into-an-array-of-words-punctuation-and-spaces-in-javascript
        const lookupWords = text.match(/\w+|\s+|[^\s\w]+/g);
        const newDelta = new Delta().retain(0).delete(text.length);
        const verifiedLookupWords = await Promise.all(
            lookupWords.map(async (lookupWord) => {
                if (lookupWord.match(/\w+/)) {
                    // check similarity of each word again and update the content
                    try {
                        const similarWords = await WordService.getSimilarWords(
                            lookupWord
                        );
                        if (
                            similarWords &&
                            similarWords.data &&
                            similarWords.data.emrWordId
                        ) {
                            return {
                                lookupWord,
                                emrWordId: similarWords.data.emrWordId,
                            };
                        } else {
                            return { lookupWord };
                        }
                    } catch (error) {
                        return { lookupWord };
                    }
                } else {
                    return { lookupWord };
                }
            })
        );
        verifiedLookupWords.forEach((lookupWordsObj) => {
            if (lookupWordsObj.emrWordId) {
                newDelta.insert(lookupWordsObj.lookupWord, {
                    markedWord: {
                        color: 'yellow',
                        word: lookupWordsObj.lookupWord,
                    },
                });
            } else {
                newDelta.insert(lookupWordsObj.lookupWord, {
                    markedWord: false,
                    background: false,
                });
            }
        });

        // https://github.com/quilljs/quill/issues/1940
        setImmediate(() => {
            quillRef.updateContents(newDelta, Quill.sources.API);
            if (isLoadData) {
                quillRef.setSelection(text.length, 0, Quill.sources.API);
            }
        });
    };

    const triggerOnChange2 = async (editor, delta, quillRef) => {
        console.log(
            '-------------------------------- debounce --------------------------------'
        );
        const text = editor.getText();
        let pos = editor.getSelection().index;
        console.log('>> pos: ', pos);
        let match = text.match(/\w+|\s+$/);
        console.log('>> match: ', match);
        // Search for the current typing word's beginning and end.
        let left = text.slice(0, pos).search(/\S+$/);
        let right = text.slice(pos).search(/\s/);
        console.log('>> left: ', left);
        if (left === -1) {
            // when type in the begining of the input text area, left set to 0
            left =
                text.slice(0, pos).search(/\s$/) === -1
                    ? 0
                    : text.slice(0, pos).search(/\s$/);
            right = text.slice(left).search(/\s/);
            console.log('***new left: ', left);
        }
        console.log('>> new left: ', left);
        console.log('>> new right: ', right);
        let currentTypingWord = {
            startIndex: left,
            endIndex: right + pos,
            word: text.slice(left, right + pos),
        };

        quillRef.removeFormat(
            currentTypingWord.startIndex,
            currentTypingWord.word.length
        );

        // do lookup work in keyWords
        const lookupWord = currentTypingWord.word;
        console.log('>> currentTypingWord: ', currentTypingWord);
        console.log('>> lookupWord: ', lookupWord);
        const newDelta = new Delta()
            .retain(currentTypingWord.startIndex)
            .delete(lookupWord.length);
        if (lookupWord.match(/\w+/)) {
            // check similarity of each word again and update the content
            try {
                const similarWords = await WordService.getSimilarWords(
                    lookupWord
                );
                if (
                    similarWords &&
                    similarWords.data &&
                    similarWords.data.emrWordId
                ) {
                    newDelta.insert(lookupWord, {
                        markedWord: {
                            color: 'yellow',
                            word: lookupWord,
                        },
                    });
                } else {
                    newDelta.insert(lookupWord, {
                        markedWord: false,
                        background: false,
                    });
                }
            } catch (error) {
                newDelta.insert(lookupWord, {
                    markedWord: false,
                    background: false,
                });
            }
        } else {
            newDelta.insert(lookupWord, {
                markedWord: false,
                background: false,
            });
        }

        // if the insert text is enter character
        setImmediate(() => {
            if (
                delta.ops.length === 2 &&
                delta.ops[1].insert &&
                /\r|\n|\t$/.test(delta.ops[1].insert)
            ) {
                pos += 1;
            }
            quillRef.updateContents(newDelta, Quill.sources.API);
            quillRef.setSelection(pos, 0, Quill.sources.API);
        });
    };

    const triggerOnChange4 = useCallback(
        debounce(async (editor, delta, quillRef) => {
            console.log(
                '-------------------------------- debounce --------------------------------'
            );
            const text = editor.getText();
            let pos = editor.getSelection().index;
            // Search for the current typing word's beginning and end.
            let left = text.slice(0, pos).search(/\S+$/);
            const right = text.slice(pos).search(/\s/);
            if (left === -1) {
                // when type in the begining of the input text area, left set to 0
                left =
                    text.slice(0, pos).search(/\s$/) === -1
                        ? 0
                        : text.slice(0, pos).search(/\s$/);
                console.log('***new left: ', left);
            }
            let currentTypingWord = {
                startIndex: left,
                endIndex: right + pos,
                word: text.slice(left, right + pos),
            };

            quillRef.removeFormat(
                currentTypingWord.startIndex,
                currentTypingWord.word.length
            );

            // do lookup work in keyWords
            const lookupWord = currentTypingWord.word;
            console.log('>> currentTypingWord: ', currentTypingWord);
            console.log('>> lookupWord: ', lookupWord);
            const newDelta = new Delta()
                .retain(currentTypingWord.startIndex)
                .delete(lookupWord.length);
            if (lookupWord.match(/\w+/)) {
                // check similarity of each word again and update the content
                try {
                    const similarWords = await WordService.getSimilarWords(
                        lookupWord
                    );
                    if (
                        similarWords &&
                        similarWords.data &&
                        similarWords.data.emrWordId
                    ) {
                        newDelta.insert(lookupWord, {
                            markedWord: {
                                color: 'yellow',
                                word: lookupWord,
                            },
                        });
                    } else {
                        newDelta.insert(lookupWord, {
                            markedWord: false,
                            background: false,
                        });
                    }
                } catch (error) {
                    newDelta.insert(lookupWord, {
                        markedWord: false,
                        background: false,
                    });
                }
            } else {
                newDelta.insert(lookupWord, {
                    markedWord: false,
                    background: false,
                });
            }

            // if the insert text is enter character
            setImmediate(() => {
                if (
                    delta.ops.length === 2 &&
                    delta.ops[1].insert &&
                    /\r|\n|\t$/.test(delta.ops[1].insert)
                ) {
                    pos += 1;
                }
                quillRef.updateContents(newDelta, Quill.sources.API);
                quillRef.setSelection(pos, 0, Quill.sources.API);
            });
        }, 100),
        []
    );

    const triggerOnChange = useCallback(
        debounce(async (editor, delta, source, quillRef, contentFromRedux) => {
            console.log(
                '-------------------------------- debounce --------------------------------'
            );
            const text = editor.getText();

            let pos;
            // editor.getSelection(), when user pasts text
            if (editor.getSelection()) {
                pos = editor.getSelection().index;
            } else {
                pos = text.length;
            }

            // Search for the current typing word's beginning and end.
            const left = text.slice(0, pos).search(/\S+$/);
            const right = text.slice(pos).search(/\s/);
            let currentTypingWord = {
                startIndex: left,
                endIndex: right + pos,
                word: text.slice(left, right + pos),
            };

            // when user input or delete letter
            if (
                // when insert the begining of the text area
                (delta.ops.length === 1 &&
                    (delta.ops[0].insert || delta.ops[0].delete) &&
                    source === Quill.sources.USER) ||
                // when insert or delete letter
                (delta.ops.length === 2 &&
                    delta.ops[0].retain &&
                    (delta.ops[1].insert || delta.ops[1].delete) &&
                    source === Quill.sources.USER) ||
                // when userInputText from redux state, editor empty
                (delta.ops.length === 1 &&
                    delta.ops[0].insert &&
                    source === Quill.sources.API) ||
                // when userInputText from redux state, editor not empty
                (delta.ops.length === 2 &&
                    delta.ops[0].insert &&
                    delta.ops[1].delete &&
                    source === Quill.sources.API)
            ) {
                quillRef.removeFormat(
                    currentTypingWord.startIndex,
                    currentTypingWord.word.length
                );
                // https://stackoverflow.com/questions/40881365/split-a-string-into-an-array-of-words-punctuation-and-spaces-in-javascript
                const lookupWords = text.match(/\w+|\s+|[^\s\w]+/g);
                const newDelta = new Delta().retain(0).delete(text.length);
                const content = {
                    arr_words: [],
                    cnt_emr: 0,
                    cnt_cdm: 0,
                };
                const verifiedLookupWords = await Promise.all(
                    lookupWords.map(async (lookupWord) => {
                        if (lookupWord.match(/\w+/)) {
                            // check similarity of each word again and update the content
                            try {
                                const similarWords = await WordService.getSimilarWords(
                                    lookupWord
                                );
                                if (
                                    similarWords &&
                                    similarWords.data &&
                                    similarWords.data.emrWordId
                                ) {
                                    const bool_is_changed =
                                        similarWords.data.emrWordId !==
                                        lookupWord;
                                    content.arr_words.push({
                                        str_text: lookupWord,
                                        id_word_emr:
                                            similarWords.data.emrWordId,
                                        bool_is_changed: false,
                                    });
                                    return {
                                        lookupWord,
                                        emrWordId: similarWords.data.emrWordId,
                                    };
                                } else {
                                    return { lookupWord };
                                }
                            } catch (error) {
                                return { lookupWord };
                            }
                        } else {
                            return { lookupWord };
                        }
                    })
                );
                verifiedLookupWords.forEach((lookupWordsObj) => {
                    if (lookupWordsObj.emrWordId) {
                        newDelta.insert(lookupWordsObj.lookupWord, {
                            markedWord: {
                                color: 'yellow',
                                word: lookupWordsObj.lookupWord,
                            },
                        });
                    } else {
                        newDelta.insert(lookupWordsObj.lookupWord, {
                            markedWord: false,
                            background: false,
                        });
                    }
                });

                // https://github.com/quilljs/quill/issues/1940
                //setImmediate(() => {
                if (
                    delta.ops.length === 2 &&
                    delta.ops[1].insert &&
                    /\r|\n|\t$/.test(delta.ops[1].insert)
                ) {
                    pos = pos + 1;
                }
                quillRef.updateContents(newDelta, Quill.sources.API);
                quillRef.setSelection(pos, 0, Quill.sources.API);
                //});
            }
        }, 400),
        []
    );

    const generateContent = async (arrWords) => {
        let cnt_cdm = 0;
        let cnt_emr = 0;
        const verifiedArrWords = await Promise.all(
            arrWords.map(async (wordObj) => {
                // check similarity of each word again and update the content
                try {
                    const similarWords = await WordService.getSimilarWords(
                        wordObj.str_text
                    );
                    console.log('-------------- similarWords ----------');
                    console.log(wordObj);
                    console.log(similarWords);
                    if (
                        similarWords &&
                        similarWords.data &&
                        similarWords.data.emrWordId
                    ) {
                        cnt_emr += 1;
                        wordObj.id_word_emr = similarWords.data.emrWordId;
                        wordObj.bool_is_changed =
                            similarWords.data.emrWordId !== wordObj.str_text;
                    }
                    if (
                        similarWords &&
                        similarWords.data &&
                        similarWords.data.id_word_cdm !== undefined
                    ) {
                        cnt_cdm += 1;
                    }

                    return wordObj;
                } catch (error) {
                    console.error(error);
                    return wordObj;
                }
            })
        );

        return {
            arr_words: verifiedArrWords,
            cnt_cdm: cnt_cdm,
            cnt_emr: cnt_emr,
        };
    };

    /* const handleOnChangeSelection = (range, source, editor) => {
        console.log(
            '------------------- handleOnChangeSelection ---------------------'
        );
        console.log('range: ', range);
        console.log('source: ', source);
        console.log('editor: ', editor);
        console.log('editor getContents: ', editor.getContents());
        console.log('editor getText: ', editor.getText());
        console.log('editor getHTML: ', editor.getHTML());
        console.log('editor getSelection: ', editor.getSelection());
        console.log('editor getLength: ', editor.getLength());
        //triggerOnChangeSelection(editor, quillRef);
    }; */

    /* const triggerOnChangeSelection = useCallback(
        debounce((editor, quillRef) => {
            let pos = editor.getLength();
            if (editor.getSelection() && editor.getSelection().index !== 0) {
                pos = editor.getSelection().index;
            }

            quillRef.setSelection(pos, 0, Quill.sources.API);
        }, 100),
        []
    ); */

    const handleOnFocus = (range, source, editor) => {
        console.log('-------------------- handleOnFocus --------------------');
        console.log('range: ', range);
        console.log('source: ', source);
        console.log('editor: ', editor);
    };

    const handleOnBlur = (previousRange, source, editor) => {
        console.log('===================== handleOnBlur ====================');
        console.log('previousRange: ', previousRange);
        console.log('source: ', source);
        console.log('editor: ', editor);
    };

    return (
        <div
            className='flex-grow-1 p-3 border border-secondary rounded'
            style={{ width: '100%' }}
        >
            <ReactQuill
                ref={(el) => {
                    setReactQuillRef(el);
                }}
                //scrollingContainer="html"
                //style={{ overflowY: 'auto', height: '55vh' }}
                value={editorHtml}
                onChange={handleOnChange}
                //onChangeSelection={handleOnChangeSelection}
                /* onFocus={handleOnFocus} */
                onBlur={handleOnBlur}
                theme={null}
            />
        </div>
    );
};

EditorWithMarkedWordFeature.propTypes = {};

export default EditorWithMarkedWordFeature;
