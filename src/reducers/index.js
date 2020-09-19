import { combineReducers } from 'redux';

import userDataReducer from './userDataReducer';
import cdmWordsReducer from './cdmWordsReducer';
import keywordsMaptoCdmWordsReducer from './keywordsMaptoCdmWordsReducer';

const rootReducer = combineReducers({
    userData: userDataReducer,
    cdmWords: cdmWordsReducer,
    keywordsMaptoCdmWords: keywordsMaptoCdmWordsReducer,
});

export default rootReducer;
