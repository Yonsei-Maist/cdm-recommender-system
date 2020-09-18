import { combineReducers } from 'redux';

import loadUserDataReducer from './loadUserDataReducer';
import loadCdmWordsReducer from './loadCdmWordsReducer';

const rootReducer = combineReducers({
    userData: loadUserDataReducer,
    cdmWords: loadCdmWordsReducer,
});

export default rootReducer;