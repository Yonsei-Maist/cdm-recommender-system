import React, { useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import {
    getCaretPosition,
    setCaretPosition,
    removeMarkTag,
    addMarkTagWithOnClickHandler,
} from '../../helpers/helpers';
import {METHOD_NAME_ONCLICK_MARKED_WORD} from '../../index';

const TextArea = ({ html, onChange, onBlur }) => {
    const MEDICAL_KEYWORDS = ['cold', 'patient'];
    const [text, setText] = useState(html);
    const contentEditable = useRef();
    const [currentCarretPos, setCurrentCarretPos] = useState();
    const handleOnClickMarkedWordFuncName = METHOD_NAME_ONCLICK_MARKED_WORD;

    React.useEffect(() => {
        const markedText = addMarkTagWithOnClickHandler(html, MEDICAL_KEYWORDS, handleOnClickMarkedWordFuncName);
        setText(markedText);
    }, [html, MEDICAL_KEYWORDS]);

    React.useEffect(() => {
        // set back the current position of carret
        setCaretPosition(contentEditable.current, currentCarretPos);
    }, [currentCarretPos, text]);

    const handleOnChange = (evt) => {
        setText(evt.target.value);
        if (!contentEditable.current.innerHTML) {
            return;
        }
        const markedText = generateMarkedText(
            contentEditable,
            setCurrentCarretPos,
            MEDICAL_KEYWORDS,
            handleOnClickMarkedWordFuncName
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
            setCurrentCarretPos,
            MEDICAL_KEYWORDS,
            handleOnClickMarkedWordFuncName
        );
        onBlur(markedText);
    };

    return (
        <ContentEditable
            className='mx-2 p-3 w-100 border border-secondary rounded'
            data-ph='Please input your text.'
            innerRef={contentEditable}
            html={text}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
        />
    );
};

export default TextArea;

function generateMarkedText(
    contentEditable,
    setCurrentCarretPos,
    MEDICAL_KEYWORDS,
    handleOnClickMarkedWordFuncName
) {
    // remove all mark tags
    const modifiedText = removeMarkTag(contentEditable.current.innerHTML);
    // get the current carret position
    setCurrentCarretPos(getCaretPosition(contentEditable.current));
    // find the markedText: text with mark tags
    const markedText = addMarkTagWithOnClickHandler(modifiedText, MEDICAL_KEYWORDS, handleOnClickMarkedWordFuncName);
    return markedText;
}
