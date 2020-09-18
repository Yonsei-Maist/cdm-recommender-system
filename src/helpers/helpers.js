export const addMarkTag = (text, keywords) => {
    const START_REGEX_STR = '(?<!\\S<mark.*)\\b(';
    const END_REGEX_STR = ')\\b(?!.*\\Smark>)';
    const newKeywords = keywords.map((keyword) => {
        return START_REGEX_STR + keyword + END_REGEX_STR;
    });
    const markedText = text
        .trim()
        .replace(
            new RegExp(newKeywords.join('|'), 'g'),
            `<mark onclick="alert('$&')">$&</mark>`
        );

    return markedText;
};

export const addMarkTagWithOnClickHandler = (
    text,
    keywords,
    onClickHandler
) => {
    const START_REGEX_STR = '(?<!\\S*<mark)\\b(\\w*';
    const END_REGEX_STR = '\\w*)\\b(?!\\S*mark>)';
    const newKeywords = keywords.map((keyword) => {
        return START_REGEX_STR + keyword + END_REGEX_STR;
    });
    const markedText = text.replace(
        new RegExp(newKeywords.join('|'), 'g'),
        `<mark onclick="${onClickHandler}('$&')">$&</mark>`
    );

    return markedText;
};

export const removeMarkTag = (text) => {
    return text.replace(/<mark.*?>(?<innerText>.*?)<\/mark>/g, '$<innerText>');
};

export const removeLastMarkTag = (text) => {
    let out = text;
    let lastOccurrence = {};
    let result = {};
    let regexp = /<mark.*?>(?<innerText>.*?)<\/mark>/g;

    while ((result = regexp.exec(text))) {
        lastOccurrence.value = result[0];
        lastOccurrence.index = result.index;
    }

    if (lastOccurrence.value) {
        out = replaceLast(
            lastOccurrence.value,
            removeMarkTag(lastOccurrence.value),
            text
        );
    }

    return out;
};

export const replaceLast = (find, replace, string) => {
    var lastIndex = string.lastIndexOf(find);

    if (lastIndex === -1) {
        return string;
    }

    var beginString = string.substring(0, lastIndex);
    var endString = string.substring(lastIndex + find.length);

    return beginString + replace + endString;
};

export const getCaretPosition = (el) => {
    var caretOffset = 0;
    var doc = el.ownerDocument || el.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != 'undefined') {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(el);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type !== 'Control') {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(el);
        preCaretTextRange.setEndPoint('EndToEnd', textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
};

// Move caret to a specific point in a DOM element
export const setCaretPosition = (el, pos) => {
    // Loop through all child nodes
    for (var node of el.childNodes) {
        if (node.nodeType === 3) {
            // we have a text node
            if (node.length >= pos) {
                // finally add our range
                var range = document.createRange(),
                    sel = window.getSelection();
                range.setStart(node, pos);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                return -1; // we are done
            } else {
                pos -= node.length;
            }
        } else {
            pos = setCaretPosition(node, pos);
            if (pos === -1) {
                return -1; // no need to finish the for loop
            }
        }
    }
    return pos; // needed because of recursion stuff
};
