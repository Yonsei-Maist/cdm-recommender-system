/**
 * @file
 * @author phorvicheka <phorvicheka@yahoo.com>
 * @date 2020-09-17
 */
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
import PropTypes from 'prop-types';

/**
 * Renders Text Area for user to input their text
 *
 * ### Usage
 *
 * ```
 * import TextArea from './components/TextArea/TextArea';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires react-contenteditable
 * @requires '../../constants'
 * @requires '../../helpers/helpers'
 * @param {Function} useState react useState hook for states: text, currentCaretPos, inputType
 * @param {Function} useEffect react useEffect hook for listening to state changed
 * @param {Function} useRef react useRef hook for ContentEditable component
 * 
 * @example
 * const onChange = (markedText) => { console.log('onChange'); };
 * const onBlur = () => { console.log('onBlur'); };
 * return (
 *      <TextArea
 *          html={""}
 *          onChange={onChange}
 *          onBlur={onBlur}
 *  	/>
 * );
 */
const TextArea = ({ html, onChange, onBlur }) => {
    const MEDICAL_KEYWORDS = ['cold', 'patient'];
    const [text, setText] = useState(html);
    const contentEditable = useRef();
    const [currentCaretPos, setCurrentCaretPos] = useState();
    const [inputType, setInputType] = useState();

    // useEffect when props html is changed
    useEffect(() => {
        const markedText = generateMarkedText(
            html,
            MEDICAL_KEYWORDS,
            METHOD_NAME_ONCLICK_MARKED_WORD
        );
        setText(markedText);
    }, [MEDICAL_KEYWORDS, html]);

    // useEffect when text is changed - to set back the current position of carret
    useEffect(() => {
        // set back the current position of carret
        if (inputType === 'insertParagraph') {
            setCaretPositionByDiv(contentEditable.current, currentCaretPos);
        } else {
            setCaretPosition(contentEditable.current, currentCaretPos);
        }
    }, [currentCaretPos, text, inputType]);

    /**
     * @method
     * @memberof TextArea
     */
    const handleOnChange = (evt) => {
        // set the inputType of user input
        setInputType(evt.nativeEvent.inputType);
        // get the current caret position
        setCurrentCaretPos(getCaretPosition(contentEditable.current));

        const markedText = generateMarkedText(
            contentEditable.current.innerHTML,
            MEDICAL_KEYWORDS,
            METHOD_NAME_ONCLICK_MARKED_WORD
        );

        // set markedText -> then, fire useEffect to set back the current position of carret
        setText(markedText);
        // trigger handle onChange from parent component
        onChange(markedText);
    };

    /**
     * @method
     * @memberof TextArea
     */
    const handleOnBlur = () => {
        if (!contentEditable.current.innerHTML) {
            return;
        }
        // get the current caret position
        setCurrentCaretPos(getCaretPosition(contentEditable.current));
        const markedText = generateMarkedText(
            contentEditable.current.innerHTML,
            MEDICAL_KEYWORDS,
            METHOD_NAME_ONCLICK_MARKED_WORD
        );
        // trigger handle onBlur from parent component
        onBlur(markedText);
    };

    /**
     * @method
     * @memberof TextArea
     */
    const generateMarkedText = (
        html,
        MEDICAL_KEYWORDS,
        handleOnClickMarkedWordFuncName
    ) => {
        // remove all mark tags
        const modifiedText = removeMarkTag(html);
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

TextArea.propTypes = {
    /**
     * path to logo image
     */
    html: PropTypes.string.isRequired,
    /**
     * function handler triggers when user types anything in the text area
     */
    onChange: PropTypes.func.isRequired,
    /**
     * function handler triggers when user leaves the text area
     */
    onBlur: PropTypes.func.isRequired,
};

export default TextArea;
