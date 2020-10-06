import React, { useRef, useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import {
    getCaretPosition,
    setCaretPosition,
    setCaretPositionByDiv,
    removeMarkTag,
    addMarkTagWithOnClickHandler,
} from '../../helpers/helpers';
import { METHOD_NAME_ONCLICK_MARKED_WORD } from '../../constants';
import { useSelector } from 'react-redux';

const TextArea = ({ html, onChange, onBlur }) => {
    const MEDICAL_KEYWORDS = ['cold', 'patient'];
    const [text, setText] = useState(html);
    const contentEditable = useRef();
    const [currentCaretPos, setCurrentCaretPos] = useState();
    const [inputType, setInputType] = useState();

    //here we watch for the loading prop in the redux store. every time it gets updated, our component will reflect it
    const userInputText = useSelector((state) => state.userData.inputText);

    useEffect(() => {
        const markedText = addMarkTagWithOnClickHandler(
            userInputText,
            MEDICAL_KEYWORDS,
            METHOD_NAME_ONCLICK_MARKED_WORD
        );
        setText(markedText);
    }, [MEDICAL_KEYWORDS, userInputText]);

    useEffect(() => {
        // set back the current position of carret
        if (inputType === 'insertParagraph') {
            setCaretPositionByDiv(contentEditable.current, currentCaretPos);
        } else {
            setCaretPosition(contentEditable.current, currentCaretPos);
        }
    }, [currentCaretPos, text, inputType]);

    const handleOnChange = (evt) => {
        setText(evt.target.value);
        setInputType(evt.nativeEvent.inputType);
        const markedText = generateMarkedText(
            contentEditable,
            setCurrentCaretPos,
            MEDICAL_KEYWORDS,
            METHOD_NAME_ONCLICK_MARKED_WORD
        );

        // set markedText
        onChange(markedText);
    };

    const handleOnBlur = () => {
        if (!contentEditable.current.innerHTML) {
            return;
        }
        const markedText = generateMarkedText(
            contentEditable,
            setCurrentCaretPos,
            MEDICAL_KEYWORDS,
            METHOD_NAME_ONCLICK_MARKED_WORD
        );
        onBlur(markedText);
    };

    const generateMarkedText = (
        contentEditable,
        setCurrentCaretPos,
        MEDICAL_KEYWORDS,
        handleOnClickMarkedWordFuncName
    ) => {
        // remove all mark tags
        const modifiedText = removeMarkTag(contentEditable.current.innerHTML);
        // get the current carret position
        setCurrentCaretPos(getCaretPosition(contentEditable.current));
        // find the markedText: text with mark tags
        const markedText = addMarkTagWithOnClickHandler(
            modifiedText,
            MEDICAL_KEYWORDS,
            handleOnClickMarkedWordFuncName
        );
        return markedText;
    };

    return (
        <ContentEditable
            className='flex-grow-1 mx-2 p-3 border border-secondary rounded'
            data-ph='Please input your text.'
            innerRef={contentEditable}
            html={text}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
        />
    );
};

export default TextArea;
