/**
 * Main Application
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05. ~
 * @date 2020.10.23
 */

/**
 * @category Index.js
 * @module index
 * @description Inside this module for start up the application, there is a global method for handling event when user clicks on marked word.
 * Note: it is global['handleOnClickMarkedWord'] not global[undefined]
 * @requires react
 * @requires react-dom
 * @requires 'react-redux'
 * @requires './index.css'
 * @requires './App'
 * @requires './store'
 * @requires './actions/wordAction'
 * @requires './constants'
 * @requires './components/EditorWithMarkedWordFeature/EditorWithMarkedWordFeature'
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store';
import { getSimilarWordsSuccess } from './actions/wordAction';
import { METHOD_NAME_ONCLICK_MARKED_WORD } from './constants';
import { getLookupPhrase } from './components/EditorWithMarkedWordFeature/EditorWithMarkedWordFeature';
import { setConfig } from './reducers/config';
import { API_BASE_ADDRESS } from './constants';

/**
 * @type {Object}
 */
const store = configureStore();

/**
 * @type {Object}
 * @property {Function} METHOD_NAME_ONCLICK_MARKED_WORD method handler when user clicks on marked word
 * @param {string} markedWord marked word or highlight word
 */
global[METHOD_NAME_ONCLICK_MARKED_WORD] = (markedWord, quillRef) => {
    if (quillRef && quillRef.getSelection()) {
        const text = quillRef.getText();
        const cursorStartIndex = quillRef.getSelection().index;
        const cursorEndIndex = cursorStartIndex;
        const lookupPhrase = getLookupPhrase(
            text,
            cursorStartIndex,
            cursorEndIndex
        );
        // add retain index or index of the first letter of the word
        markedWord.retain = lookupPhrase.startIndex;

        const data = {
            emrWordId: markedWord.emrWordId,
            cdmWordsList: markedWord.cdmWordsList,
            markedWord,
        };
        store.dispatch(getSimilarWordsSuccess(data));
    }
};

class MainApp {
    constructor(el) {
        this.el = el;
        this.store = store;
    }

    /**
     * 화면 정보 초기화
     */
    init(randerDiv, setting) {
        if (process && process.env && process.env.NODE_ENV !== 'production') {
            setting = {
                APIServer: API_BASE_ADDRESS,
            };
        }
        this.store.dispatch(
            setConfig({
                defaultSetting: setting,
            })
        );

        ReactDOM.render(
            <React.StrictMode>
                <Provider store={store}>
                    <App />
                </Provider>
            </React.StrictMode>,
            document.getElementById(randerDiv)
        );
    }
}

export default MainApp;
