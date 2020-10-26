import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { MarkedWord } from '../../formats/markedWord';
import WordService from '../../api/wordService';
import { useDispatch, useSelector } from 'react-redux';
import { setContent } from '../../actions/contentAction';
import _ from 'lodash';

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

    const dispatch = useDispatch();
    const content = useSelector((state) => state.content);

    useEffect(() => {
        console.log(
            '-------------------------------- useEffect -------------------------------'
        );
        (async () => {
            if (
                quillRef &&
                content &&
                !_.isEqual(buildContentByDelta(quillRef.getContents()), content)
            ) {
                const newDelta = await buildDeltaByContent(content);
                quillRef.setContents(newDelta, Quill.sources.API);
                quillRef.setSelection(
                    quillRef.getText().length,
                    0,
                    Quill.sources.API
                );
                // update content from quillRef.getContents()
                dispatch(
                    setContent(buildContentByDelta(quillRef.getContents()))
                );
            }
        })();
    }, [content]);

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

    // when load data, we get the saved content from redux.
    // Built delta by content for display the content in the editor
    const buildDeltaByContent = async (content) => {
        console.log(
            '--------------------------- builDeltaByContent ---------------------------'
        );
        console.log(quillRef);
        console.log('-----------------content----------------------');
        console.log(content);
        console.log(
            '-----------------buildContentByDelta(quillRef.getContents())----------------------'
        );
        console.log(buildContentByDelta(quillRef.getContents()));
        const text = quillRef.getText();
        const verifiedLookupWords = await verifyContent(content);
        console.log('----------------------- verifiedLookupWords ------------');
        console.log(verifiedLookupWords);
        const newDelta = buildDelta(0, text.length, verifiedLookupWords);
        console.log(newDelta);

        return newDelta;
    };

    // return content -> to update the content of redux
    const buildContentByDelta = (delta) => {
        console.log(delta);
        if (delta && delta.ops && delta.ops.length !== 0) {
            let cntCdm = 0;
            let cntEmr = 0;
            let arrWords = [];

            delta.ops.forEach((op, index) => {
                if (op.insert) {
                    if (op.attributes && op.attributes.markedWord) {
                        const {
                            strText,
                            emrWordId,
                            boolIsChanged,
                            cdmWordId,
                        } = op.attributes.markedWord;
                        if (boolIsChanged) {
                            cntCdm += 1;
                            arrWords.push({
                                str_text: strText,
                                id_word_emr: emrWordId,
                                bool_is_changed: boolIsChanged,
                                id_word_cdm: cdmWordId,
                            });
                        } else {
                            cntEmr += 1;
                            arrWords.push({
                                str_text: strText,
                                id_word_emr: emrWordId,
                                bool_is_changed: boolIsChanged,
                            });
                        }
                    } else {
                        let text = op.insert;
                        // if last one, remove the last character (an ↵ of quill) from op.attributes.insert
                        if (delta.ops.length === index + 1) {
                            text = text.slice(0, -1);
                        }
                        const strTexts = text.match(/\w+|\s+|[^\s\w]+/g);
                        if (strTexts) {
                            strTexts.forEach((strText) => {
                                arrWords.push({
                                    str_text: strText,
                                });
                            });
                        }
                    }
                }
            });
            console.log(arrWords);
            console.log(cntCdm);
            console.log(cntEmr);

            return {
                arr_words: arrWords,
                cnt_cdm: cntCdm,
                cnt_emr: cntEmr,
            };
        }
    };

    // return verifiedLookupWords object for buildDelta
    const verifyContent = async (content) => {
        return await Promise.all(
            content.arr_words.map(async (arrWord) => {
                const {
                    str_text,
                    id_word_emr,
                    bool_is_changed,
                    id_word_cdm,
                } = arrWord;
                let lookupWord = id_word_emr ? id_word_emr : str_text;
                if (lookupWord.match(/\w+/)) {
                    let similarWords;
                    // check similarity of each word
                    try {
                        similarWords = await WordService.getSimilarWords(
                            lookupWord
                        );
                        if (
                            similarWords &&
                            similarWords.data &&
                            similarWords.data.emrWordId
                        ) {
                            if (bool_is_changed) {
                                return {
                                    lookupWord: id_word_cdm,
                                    emrWordId: similarWords.data.emrWordId,
                                    cdmWordsList:
                                        similarWords.data.cdmWordsList,
                                    boolIsChanged: bool_is_changed,
                                    cdmWordId: id_word_cdm,
                                };
                            } else {
                                return {
                                    lookupWord: similarWords.data.emrWordId,
                                    emrWordId: similarWords.data.emrWordId,
                                    cdmWordsList:
                                        similarWords.data.cdmWordsList,
                                    boolIsChanged: false,
                                };
                            }
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

    // return verifiedLookupWords object for buildDelta
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
                                cdmWordsList: similarWords.data.cdmWordsList,
                                boolIsChanged: false,
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

    // buildDelta build with verifiedLookupWords for displaying content in the editor
    const buildDelta = (retainIndex, deleteLength, verifiedLookupWords) => {
        const newDelta = new Delta().retain(retainIndex).delete(deleteLength);
        verifiedLookupWords.forEach((lookupWordsObj) => {
            if (lookupWordsObj.emrWordId) {
                newDelta.insert(lookupWordsObj.lookupWord, {
                    markedWord: {
                        color: 'yellow',
                        strText: lookupWordsObj.lookupWord,
                        emrWordId: lookupWordsObj.emrWordId,
                        cdmWordsList: lookupWordsObj.cdmWordsList,
                        boolIsChanged: !!lookupWordsObj.boolIsChanged,
                        cdmWordId: lookupWordsObj.cdmWordId,
                        quillRef,
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
        console.log(lookupWords);
        if (lookupWords) {
            const verifiedLookupWords = await verifyLookupWords(lookupWords);
            console.log(verifiedLookupWords);
            const newDelta = buildDelta(0, text.length, verifiedLookupWords);
            console.log(newDelta);

            // https://github.com/quilljs/quill/issues/1940
            setImmediate(() => {
                quillRef.updateContents(newDelta, Quill.sources.API);
                //quillRef.setSelection(text.length, 0, Quill.sources.API);
            });
        }
    };

    const triggerOnChange2 = async (
        quillRef,
        delta,
        lookupPhrase,
        cursorPosition
    ) => {
        console.log(
            '-------------------------------- triggerOnChange2 --------------------------------'
        );
        // when user pasts text -> editor.getSelection() is null
        console.log(quillRef);
        /* const isPastText =
            source === Quill.sources.USER && quillRef.getSelection() == null; */

        //let cursorPosition = cursorPosition; //quillRef.getSelection().index;
        // Search for the current typing word's beginning and end.
        //const text = quillRef.getText();
        //let lookupPhrase = getLookupPhrase(text, pos);

        // remove format from lookup phrase
        quillRef.removeFormat(
            lookupPhrase.startIndex,
            lookupPhrase.words.length
        );

        // lookupWords array that contains:
        // + words & white space characters found from left side of the cursor position
        // + word found from right side of the cursor position
        const lookupWords = lookupPhrase.words.match(/\w+|\s+|[^\s\w]+/g);
        if (lookupWords) {
            const verifiedLookupWords = await verifyLookupWords(lookupWords);
            const newDelta = buildDelta(
                lookupPhrase.startIndex,
                lookupPhrase.words.length,
                verifiedLookupWords
            );
            console.log(newDelta);
            // if the insert text is enter character
            setImmediate(() => {
                if (
                    delta.ops.length === 2 &&
                    delta.ops[1].insert &&
                    /\r|\n|\t$/.test(delta.ops[1].insert)
                ) {
                    cursorPosition += 1;
                }
                quillRef.updateContents(newDelta, Quill.sources.API);
                quillRef.setSelection(cursorPosition, 0, Quill.sources.API);
                // update content from quillRef.getContents()
                dispatch(
                    setContent(buildContentByDelta(quillRef.getContents()))
                );
            });
        }
    };

    const getLookupPhrase = (text, cursorStartIndex, cursorEndIndex) => {
        let left = text.slice(0, cursorStartIndex).search(/\S+$/);
        let right = text.slice(cursorEndIndex).search(/\s/);
        let startIndex = left;
        let endIndex = right + cursorEndIndex;
        let words = text.slice(startIndex, endIndex);

        // when typing space, left == -1
        if (left === -1) {
            left = text.slice(0, cursorStartIndex).search(/\w*\s*$/);
            // when type in the begining of the input text area, left set to 0
            if (left === -1) {
                left = 0;
            }
            startIndex = left;
            //endIndex = left+right;
            words = text.slice(startIndex, endIndex);
        }

        let currentTypingWords = {
            startIndex,
            endIndex,
            words,
        };
        return currentTypingWords;
    };

    const handleOnChange = async (content, delta, source, editor) => {
        setEditorHtml(content);

        console.log('========== handleOnChange ==========');
        console.log(editor.getContents());
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
        const isPastText =
            source === Quill.sources.USER && editor.getSelection() == null;
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

        console.log('---------------source----------------');
        console.log(source);
        console.log('---------------delta----------------');
        console.log(delta);
        console.log('---------------editor.getSelection()----------------');
        console.log(editor.getSelection());
        console.log('---------------quillRef----------------');
        console.log(quillRef);
        //if (isPastText || isLoadData) {
        if (isPastText) {
            //triggerOnChange1(quillRef, isLoadData);
        }

        // When user insert or delete text
        if (
            // editor.getSelection() is null when user pasts text
            //!isPastText &&
            //!isLoadData &&
            isPastText ||
            isUserInput
        ) {
            console.log('+++++++++++++++++++++++++++++++++++++++++++++');
            console.log(editor.getSelection());
            const text = quillRef.getText();
            let cursorStartIndex;
            let cursorEndIndex;
            console.log(isPastText);
            if (isPastText) {
                //triggerOnChange1(quillRef, isLoadData);
                cursorStartIndex = delta.ops[0].retain ? delta.ops[0].retain : 0;
                console.log(delta.ops);
                cursorEndIndex = delta.ops.reduce((accumulator, op) => {
                    if (op.retain) {
                        return (accumulator += op.retain);
                    } else if (op.delete) {
                        return (accumulator -= op.delete);
                    } else {
                        return (accumulator += op.insert.length);
                    }
                }, 0);
            } else {
                cursorStartIndex = quillRef.getSelection().index;
                cursorEndIndex = cursorStartIndex;
            }

            // Search for lookup phrase
            // word found from the left of cursorPosition until
            // word found from the right of cursorPosition
            let lookupPhrase = getLookupPhrase(
                text,
                cursorStartIndex,
                cursorEndIndex
            );
            console.log('##################################');
            console.log(lookupPhrase);

            triggerOnChange2(quillRef, delta, lookupPhrase, cursorEndIndex);
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
                //onChangeSelection={handleOnChangeSelection}
                //onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                theme={null}
            />
        </div>
    );
};

EditorWithMarkedWordFeature.propTypes = {};

export default EditorWithMarkedWordFeature;
