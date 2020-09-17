export const addMarkTag = (text, keywords) => {
    const START_REGEX_STR = '(?<!\\S<mark.*)\\b(\\w*';
    const END_REGEX_STR = '\\w*)\\b(?!.*\\Smark>)';
    const newKeywords = keywords.map(keyword => {
        return START_REGEX_STR + keyword + END_REGEX_STR;
    });
    console.log(new RegExp(newKeywords.join('|'), 'g'));
    console.log(text);
    const markedText = text.trim().replace(
        new RegExp(newKeywords.join('|'), 'g'),
        `<mark onclick="alert('$&')">$&</mark>`,
    )
    console.log(markedText);

    return markedText;
};

export const addMarkTagWithOnClickHandler = (text, keywords, onClickHandler) => {
    const START_REGEX_STR = '(?<!\\S*<mark)\\b(\\w*';
    const END_REGEX_STR = '\\w*)\\b(?!\\S*mark>)';
    const newKeywords = keywords.map(keyword => {
        return START_REGEX_STR + keyword + END_REGEX_STR;
    });
    console.log(new RegExp(newKeywords.join('|'), 'g'));
    console.log(text);
    const markedText = text.replace(
        new RegExp(newKeywords.join('|'), 'g'),
        `<mark onclick="${onClickHandler}('$&')">$&</mark>`,
    )
    console.log(markedText);

    return markedText;
};

export const removeMarkTag = text => {};
