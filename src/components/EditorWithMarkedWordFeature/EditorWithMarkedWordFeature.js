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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // when load data, we get the saved content from redux.
    // Built delta by content for display the content in the editor
    const buildDeltaByContent = async (content) => {
        const text = quillRef.getText();
        const verifiedLookupWords = await verifyContent(content);
        const newDelta = buildDelta(0, text.length, verifiedLookupWords);

        return newDelta;
    };

    // return content -> to update the content of redux
    const buildContentByDelta = (delta) => {
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

    const triggerOnChange = async (
        quillRef,
        delta,
        lookupPhrase,
        cursorPosition
    ) => {
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

        if (quillRef === null) {
            return;
        }

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

        // When user insert or delete text, or past text
        if (
            isPastText ||
            isUserInput
        ) {
            const text = quillRef.getText();
            let cursorStartIndex;
            let cursorEndIndex;
            if (isPastText) {
                cursorStartIndex = delta.ops[0].retain ? delta.ops[0].retain : 0;
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

            triggerOnChange(quillRef, delta, lookupPhrase, cursorEndIndex);
        }
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
                value={editorHtml}
                onChange={handleOnChange}
                theme={null}
            />
        </div>
    );
};

EditorWithMarkedWordFeature.propTypes = {};

export default EditorWithMarkedWordFeature;
