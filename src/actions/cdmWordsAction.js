/**
 * @file
 * @author phorvicheka <phorvicheka@yahoo.com>
 * @date 2020-09-19
 */

/**
 * @category Actions
 * @module actions/cdmWordsAction
 * @requires ../action-types
 */
import { CDM_WORDS } from '../action-types';

/**
 * @method
 * @description load CDM words loading action
 * @param {string} markedWord marked word or keyword to fetch an array of CDM words
 *
 * @returns {object} {type: CDM_WORDS.LOAD_CDM_WORDS_LOADING, markedWord}
 */
const loadCdmWords = (markedWord) => ({
    type: CDM_WORDS.LOAD_CDM_WORDS_LOADING,
    markedWord,
});

/**
 * @method
 * @description set load CDM words success action
 * @param {Array} cdmWords array of objects
 *
 * @returns {Object} {type: CDM_WORDS.LOAD_CDM_WORDS_SUCCESS, cdmWords}
 */
const setLoadCdmWordsSuccess = (cdmWords) => ({
    type: CDM_WORDS.LOAD_CDM_WORDS_SUCCESS,
    cdmWords,
});

/**
 * @method
 * @description set load CDM words error action
 * @param {string} error error message
 *
 * @returns {Object} {type: CDM_WORDS.LOAD_CDM_WORDS_ERROR, error}
 */
const setLoadCdmWordsError = (error) => ({
    type: CDM_WORDS.LOAD_CDM_WORDS_ERROR,
    error,
});

export { loadCdmWords, setLoadCdmWordsSuccess, setLoadCdmWordsError };
