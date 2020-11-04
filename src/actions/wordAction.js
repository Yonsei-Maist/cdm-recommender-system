/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

/**
 * @category Actions
 * @module actions/wordAction
 * @requires ../action-types/docType
 */
import { createAction } from 'redux-actions';
import WORD from '../action-types/wordType';

// Get similar words List
const getSimilarWordsRequest = createAction(WORD.GET_SIMILAR_WORDS_REQUEST);
const getSimilarWordsSuccess = createAction(WORD.GET_SIMILAR_WORDS_SUCCESS);
const getSimilarWordsError = createAction(WORD.GET_SIMILAR_WORDS_ERROR);

const setChangeEmrWord = createAction(WORD.SET_CHANGE_EMR_WORD);
const setResetChangeEmrWord = createAction(WORD.SET_RESET_CHANGE_EMR_WORD);

export {
    getSimilarWordsRequest,
    getSimilarWordsSuccess,
    getSimilarWordsError,
    setChangeEmrWord,
    setResetChangeEmrWord,
};
