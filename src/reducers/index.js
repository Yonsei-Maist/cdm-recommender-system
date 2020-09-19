import { combineReducers } from 'redux';

import userDataReducer from './userDataReducer';
import cdmWordsReducer from './cdmWordsReducer';

const rootReducer = combineReducers({
    userData: userDataReducer,
    cdmWords: cdmWordsReducer,
});

export default rootReducer;