import React, { useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';

const TextArea = ({html,  onChange, onBlur}) => {
    const [text, setText] = useState(html);
    const contentEditable = useRef();

    React.useEffect(() => {
        setText(html);
    }, [html])

    const handleOnChange = (evt) => {
        setText(evt.target.value);
        console.log(contentEditable.current.innerHTML); // Correct value
        console.log(contentEditable.current); // Correct value
        onChange(contentEditable.current.innerHTML);
    };

    const handleOnBlur = () => {
        console.log(contentEditable.current.innerHTML); // Correct value
        onBlur(contentEditable.current.innerHTML);
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
