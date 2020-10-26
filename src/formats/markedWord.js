import { Quill } from 'react-quill';
import { v4 } from 'uuid';
import { METHOD_NAME_ONCLICK_MARKED_WORD } from '../constants';

const Inline = Quill.import('blots/inline');
export class MarkedWord extends Inline {
    /**
     * This static function generates a DOM Node for the Blot.
     * It will generate a DOM Node with the provided tagName and className.
     * This is not a good place to set listeners because you can't save a reference to them anywhere to remove them.
     * Don't call this function directly. Use parchment.create(blotName): Blot instead.
     * @param {Any} value
     */
    static create(value) {
        const id = v4();
        const {
            color,
            strText,
            emrWordId,
            cdmWordsList,
            boolIsChanged,
            cdmWordId,
            quillRef,
        } = value;
        let node = super.create(value);
        node.setAttribute('data-id', id);
        node.style.backgroundColor = color;
        node.style.cursor = 'pointer';
        node.dataset.id = id;
        node.dataset.color = color;
        node.dataset.strText = strText;
        node.dataset.emrWordId = emrWordId;
        node.dataset.cdmWordsList = JSON.stringify(cdmWordsList);
        node.dataset.boolIsChanged = boolIsChanged;
        node.dataset.cdmWordId = cdmWordId;
        node.addEventListener(
            'click',
            function (ev) {
                global[METHOD_NAME_ONCLICK_MARKED_WORD](emrWordId, quillRef);
                ev.preventDefault();
            },
            false
        );

        return node;
    }

    /**
     * when call blot.formats() or getFormat() of the quill of react-quill
     * Returns format values represented by domNode if it is this Blot's type
     * No checking that domNode is this Blot's type is required.
     * @param {*} node
     */
    static formats(node) {
        if (!node.style.backgroundColor) return null;

        return {
            id: node.dataset.id,
            color: node.dataset.color,
            strText: node.dataset.strText,
            emrWordId: node.dataset.emrWordId,
            cdmWordsList: JSON.parse(node.dataset.cdmWordsList),
            boolIsChanged: node.dataset.boolIsChanged === 'false'? false: true,
            cdmWordId: node.dataset.cdmWordId,
        };
    }
}

MarkedWord.blotName = 'markedWord';
