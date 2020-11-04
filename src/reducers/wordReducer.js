/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

import { handleActions } from 'redux-actions';
import WORD from '../action-types/wordType';

/**
 * @type {Object}
 * @default
 * {
 *      similarWords: {
 *          data: [],
 *          isLoading: false,
 *          error: '',
 *      },
 * }
 */
const defaultState = {
    similarWords: {
        data: {},
        isLoading: false,
        error: '',
    },
    changeEmrWord: {},
    resetChangeEmrWord: {},
};

const wordReducer = handleActions(
    {
        // Get similar words List
        [WORD.GET_SIMILAR_WORDS_REQUEST]: (state, action) => ({
            ...state,
            similarWords: {
                ...state.similarWords,
                isLoading: true,
                error: '',
            },
        }),
        [WORD.GET_SIMILAR_WORDS_SUCCESS]: (state, action) => ({
            ...state,
            similarWords: {
                ...state.similarWords,
                data: action.payload,
                isLoading: false,
            },
        }),
        [WORD.GET_SIMILAR_WORDS_ERROR]: (state, action) => ({
            ...state,
            similarWords: {
                ...state.similarWords,
                isLoading: false,
                error: action.payload.error,
            },
        }),
        [WORD.SET_CHANGE_EMR_WORD]: (state, action) => ({
            ...state,
            changeEmrWord: action.payload,
        }),
        [WORD.SET_RESET_CHANGE_EMR_WORD]: (state, action) => ({
            ...state,
            resetChangeEmrWord: action.payload,
        }),
    },
    defaultState
);

export default wordReducer;
