import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { MarkedWord } from '../../formats/markedWord';
import WordService from '../../api/wordService';
import { useDispatch, useSelector } from 'react-redux';

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

    const contentFromRedux = useSelector((state) => state.content);

    useEffect(() => {
        console.log(
            '-------------------------------- useEffect -------------------------------'
        );
        setEditorHtml(generateText(contentFromRedux));
    }, [contentFromRedux]);

    useEffect(() => {
        if (
            reactQuillRef == null ||
            (reactQuillRef != null &&
                typeof reactQuillRef.getEditor !== 'function')
        )
            return;
        setQuillRef(reactQuillRef.getEditor());
    }, [reactQuillRef]);

    const generateText = (content) => {
        const arrayWords = content.arr_words.map((word) => {
            return word.str_text;
        });
        return arrayWords.join('');
    };

    const verifyLookupWords = async (lookupWords) => {
        return await Promise.all(
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
    };

    const buildDelta = (retainIndex, deleteLength, verifiedLookupWords) => {
        const newDelta = new Delta().retain(retainIndex).delete(deleteLength);
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
        return newDelta;
    };

    const triggerOnChange1 = async (quillRef, isLoadData) => {
        console.log(
            '-------------------------------- triggerOnChange1 --------------------------------'
        );
        const text = quillRef.getText();
        console.log(text);
        // https://stackoverflow.com/questions/40881365/split-a-string-into-an-array-of-words-punctuation-and-spaces-in-javascript
        const lookupWords = text.match(/\w+|\s+|[^\s\w]+/g);
        if (lookupWords) {
            const verifiedLookupWords = await verifyLookupWords(lookupWords);
            const newDelta = buildDelta(0, text.length, verifiedLookupWords);

            // https://github.com/quilljs/quill/issues/1940
            setImmediate(() => {
                quillRef.updateContents(newDelta, Quill.sources.API);
                if (isLoadData) {
                    quillRef.setSelection(text.length, 0, Quill.sources.API);
                }
            });
        }
    };

    const triggerOnChange2 = async (quillRef, delta) => {
        console.log(
            '-------------------------------- triggerOnChange2 --------------------------------'
        );
        const text = quillRef.getText();
        let pos = quillRef.getSelection().index;
        // Search for the current typing word's beginning and end.
        let left = text.slice(0, pos).search(/\S+$/);
        let right = text.slice(pos).search(/\s/);
        let startIndex = left;
        let endIndex = right + pos;
        let words = text.slice(startIndex, endIndex);

        // when typing space, left == -1
        if (left === -1) {
            left = text.slice(0, pos).search(/\w*\s*$/);
            // when type in the begining of the input text area, left set to 0
            if (left === -1) {
                left = 0;
            }
            startIndex = left;
            //endIndex = left+right;
            words = text.slice(startIndex, endIndex);
        }

        let currentTypingWord = {
            startIndex,
            endIndex,
            words,
        };

        quillRef.removeFormat(
            currentTypingWord.startIndex,
            currentTypingWord.words.length
        );

        // do lookup work in keyWords
        const lookupWords = currentTypingWord.words.match(/\w+|\s+|[^\s\w]+/g);
        if (lookupWords) {
            const verifiedLookupWords = await verifyLookupWords(lookupWords);
            const newDelta = buildDelta(
                currentTypingWord.startIndex,
                currentTypingWord.words.length,
                verifiedLookupWords
            );
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
        }
    };

    const handleOnChange = async (content, delta, source, editor) => {
        setEditorHtml(content);

        console.log('========== handleOnChange ==========');
        if (quillRef === null) {
            return;
        }
        // when user click on load data which update the contentFromRedux
        // when update text to empty editor --> delta.ops.length === 1 && delta.ops[0].insert
        // when update text to not-empty editor --> delta.ops.length === 2 && delta.ops[0].insert && delta.ops[1].delete
        const isLoadData =
            source === Quill.sources.API &&
            ((delta.ops.length === 1 && delta.ops[0].insert) ||
                (delta.ops.length === 2 &&
                    delta.ops[0].insert &&
                    delta.ops[1].delete));
        // when user pasts text -> editor.getSelection() is null
        const isPastText = editor.getSelection() == null;
        // when user insert or delete text
        // when insert the begining of the text area --> delta.ops.length === 1 && (delta.ops[0].insert || delta.ops[0].delete)
        // when insert or delete letter --> delta.ops.length === 2 && delta.ops[0].retain && (delta.ops[1].insert || delta.ops[1].delete)
        const isUserInput =
            source === Quill.sources.USER &&
            ((delta.ops.length === 1 &&
                (delta.ops[0].insert || delta.ops[0].delete)) ||
                (delta.ops.length === 2 &&
                    delta.ops[0].retain &&
                    (delta.ops[1].insert || delta.ops[1].delete)));

        if (isPastText || isLoadData) {
            triggerOnChange1(quillRef, isLoadData);
        }

        // When user insert or delete text
        if (
            // editor.getSelection() is null when user pasts text
            !isPastText &&
            !isLoadData &&
            isUserInput
        ) {
            console.log('+++++++++++++++++++++++++++++++++++++++++++++');
            console.log(editor.getSelection());
            triggerOnChange2(quillRef, delta);
        }
    };

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

    const handleOnChangeSelection = (range, source, editor) => {
        console.log(
            '====================================== handleOnChangeSelection =========================================='
        );
        /* console.log('range: ', range);
        console.log('source: ', source);
        console.log('editor: ', editor); */
    };

    const handleOnFocus = (range, source, editor) => {
        console.log('-------------------- handleOnFocus --------------------');
        /* console.log('range: ', range);
        console.log('source: ', source);
        console.log('editor: ', editor); */
    };

    const handleOnBlur = (previousRange, source, editor) => {
        console.log('===================== handleOnBlur ====================');
        /* console.log('previousRange: ', previousRange);
        console.log('source: ', source);
        console.log('editor: ', editor); */
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
                onChangeSelection={handleOnChangeSelection}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                theme={null}
            />
        </div>
    );
};

EditorWithMarkedWordFeature.propTypes = {};

export default EditorWithMarkedWordFeature;
