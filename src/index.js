import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadCdmWords } from './actions/cdmWordsAction';

const store = configureStore();

export const METHOD_NAME_ONCLICK_MARKED_WORD = 'handleOnClickMarkedWord';
global[METHOD_NAME_ONCLICK_MARKED_WORD] = (markedWord) => {
    store.dispatch(loadCdmWords(markedWord));
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
