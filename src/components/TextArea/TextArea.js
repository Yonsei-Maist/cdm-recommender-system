import React, { useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';

const TextArea = ({html,  onChange, onBlur}) => {
    const [text, setText] = useState(html);
    const contentEditable = useRef();

    React.useEffect(() => {
        setText(html);
    }, [html])

    const handleChange = (evt) => {
        setText(evt.target.value);
        console.log(contentEditable.current.innerHTML); // Correct value
    };

    const handleBlur = () => {
        console.log(contentEditable.current.innerHTML); // Correct value
    };

    return (
        <ContentEditable
            className='mx-2 p-3 w-100 border border-secondary rounded'
            data-ph='Please input your text.'
            innerRef={contentEditable}
            html={text}
            onBlur={handleBlur}
            onChange={handleChange}
        />
    );
};

export default TextArea;
