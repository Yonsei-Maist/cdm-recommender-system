/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.19
 */

/**
 * @category Actions
 * @module actions/keywordsMaptoCdmWordsAction
 * @requires ../action-types
 */
import { KEYWORDS_MAPTO_CDM_WORDS } from '../action-types';

/**
 * @method
 * @description set keywords mapto CDM words (keywordsMaptoCdmWords state) action
 * @param {string} keyword keyword that matches to the CDM words
 * @param {Array} cdmWords array of objects
 *
 * @returns {Object} {type: KEYWORDS_MAPTO_CDM_WORDS.SET_KEYWORDS_MAPTO_CDM_WORDS, keyword, cdmWords}
 */
const setKeywordsMaptoCdmWords = ({ keyword, cdmWords }) => ({
    type: KEYWORDS_MAPTO_CDM_WORDS.SET_KEYWORDS_MAPTO_CDM_WORDS,
    keyword,
    cdmWords,
});

export { setKeywordsMaptoCdmWords };
