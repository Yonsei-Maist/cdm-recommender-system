/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.18
 */

/**
 * @category Reducers
 * @module reducers/index
 * @requires 'redux'
 * @requires './cdmWordsReducer'
 * @requires './userDataReducer'
 * @requires './keywordsMaptoCdmWordsReducer'
 * @requires './docReducer'
 */
import { combineReducers } from 'redux';

import userDataReducer from './userDataReducer';
import cdmWordsReducer from './cdmWordsReducer';
import keywordsMaptoCdmWordsReducer from './keywordsMaptoCdmWordsReducer';
import docReducer from './docReducer';
import errorReducer from './errorReducer';

/**
 * @type {Object}
 * @property {Object} userData
 * @property {Object} cdmWords
 * @property {Object} keywordsMaptoCdmWords
 * @property {Object} doc
 */
const rootReducer = combineReducers({
    userData: userDataReducer,
    cdmWords: cdmWordsReducer,
    keywordsMaptoCdmWords: keywordsMaptoCdmWordsReducer,
    doc: docReducer,
    error: errorReducer,
});

export default rootReducer;
