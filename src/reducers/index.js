import { combineReducers } from 'redux';

import loadUserDataReducer from './loadUserDataReducer'

const rootReducer = combineReducers({
    userData: loadUserDataReducer,
});

export default rootReducer;