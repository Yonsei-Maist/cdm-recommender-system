import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../src/reducers';

// Importing the Bootstrap CSS
import '../../src/index.css';
import '../../src/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const initState = {
    userData: {
        data: [
            {
                id: '1',
                title: 'title 1',
                data: 'In my opinion, this patient have cold and .....',
            },
            {
                id: '2',
                title: 'title 2',
                data: 'data 2',
            },
        ],
        isLoading: false,
        error: '',
        inputText:
            'In my opinion, this <mark onclick="handleOnClickMarkedWord(\'patient\')">patient</mark> have <mark onclick="handleOnClickMarkedWord(\'cold\')">cold</mark> and .....',
    },
    cdmWords: {
        data: [
            {
                id: '1',
                data: 'Common cold – 92%',
            },
            {
                id: '2',
                data: 'Coryza – 4%​ Flu – 2%',
            },
        ],
        isLoading: false,
        error: '',
    },
    keywordsMaptoCdmWords: {
        cold: [
            {
                id: '1',
                data: 'Common cold – 92%',
            },
            {
                id: '2',
                data: 'Coryza – 4%​ Flu – 2%',
            },
        ],
    },
};
const store = createStore(rootReducer, initState);

const Component = (props) => {
    return (
        <Provider store={store} id='docs-helpers-js'>
            {props.children}
        </Provider>
    );
};

export default Component;
