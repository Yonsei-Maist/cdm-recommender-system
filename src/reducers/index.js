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
 */
import { combineReducers } from 'redux';

import userDataReducer from './userDataReducer';
import cdmWordsReducer from './cdmWordsReducer';
import keywordsMaptoCdmWordsReducer from './keywordsMaptoCdmWordsReducer';

/**
 * @type {Object}
 * @property {Object} userData
 * @property {Object} cdmWords
 * @property {Object} keywordsMaptoCdmWords
 */
const rootReducer = combineReducers({
    userData: userDataReducer,
    cdmWords: cdmWordsReducer,
    keywordsMaptoCdmWords: keywordsMaptoCdmWordsReducer,
});

export default rootReducer;
