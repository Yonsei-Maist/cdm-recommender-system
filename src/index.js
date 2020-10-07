/**
 * @file
 * @author phorvicheka, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.16
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
 * @requires './serviceWorker'
 * @requires './store'
 * @requires 'bootstrap/dist/css/bootstrap.min.css'
 * @requires './actions/cdmWordsAction'
 * @requires './constants'
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadCdmWords, setLoadCdmWordsSuccess } from './actions/cdmWordsAction';
import { METHOD_NAME_ONCLICK_MARKED_WORD } from './constants';

/**
 * @type {Object}
 */
const store = configureStore();

/**
 * @type {Object}
 * @property {Function} METHOD_NAME_ONCLICK_MARKED_WORD method handler when user clicks on marked word
 * @param {string} markedWord marked word or highlight word
 */
global[METHOD_NAME_ONCLICK_MARKED_WORD] = (markedWord) => {
    const keywordsMaptoCdmWords = store.getState().keywordsMaptoCdmWords;
    const isExistKeyword = markedWord in keywordsMaptoCdmWords;
    if (isExistKeyword) {
        store.dispatch(
            setLoadCdmWordsSuccess(keywordsMaptoCdmWords[markedWord])
        );
    } else {
        store.dispatch(loadCdmWords(markedWord));
    }
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
