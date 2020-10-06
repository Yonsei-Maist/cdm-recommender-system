/**
 * @category Reducers
 * @module reducers/cdmWordsReducer
 * @requires '../action-types'
 */
import { CDM_WORDS } from '../action-types';

/**
 * @type {Object}
 * @default
 * {
 *  data: [],
 *  isLoading: false,
 *  error: '',
 * }
 */
const initialState = {
    data: [],
    isLoading: false,
    error: '',
};

/**
 * @function
 * @description reducer for cdmWords state
 * @param {Object} state=initialState redux state
 * @param {Object} action redux action related to CDM_WORDS from '../action-types'
 */
const cdmWordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CDM_WORDS.LOAD_CDM_WORDS_LOADING: {
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        }
        case CDM_WORDS.LOAD_CDM_WORDS_SUCCESS: {
            return {
                ...state,
                data: action.cdmWords,
                isLoading: false,
            };
        }
        case CDM_WORDS.LOAD_CDM_WORDS_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        }
        default: {
            return state;
        }
    }
};

export default cdmWordsReducer;
