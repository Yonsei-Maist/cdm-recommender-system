/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.18
 */

/**
 * @category Reducers
 * @module reducers/index
 * @requires 'redux'
 * @requires './userDataReducer'
 * @requires './docReducer'
 * @requires './wordReducer'
 * @requires './errorReducer'
 * @requires './contentReducer'
 */
import { combineReducers } from 'redux';

import userDataReducer from './userDataReducer';
import docReducer from './docReducer';
import wordReducer from './wordReducer';
import errorReducer from './errorReducer';
import contentReducer from './contentReducer';

/**
 * @type {Object}
 * @property {Object} userData
 * @property {Object} doc
 */
const rootReducer = combineReducers({
    userData: userDataReducer,
    doc: docReducer,
    word: wordReducer,
    error: errorReducer,
    content: contentReducer,
});

export default rootReducer;
