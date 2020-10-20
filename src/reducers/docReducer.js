/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

import { handleActions } from 'redux-actions';
import DOC from '../action-types/doc';

/**
 * @type {Object}
 * @default
 * {
 *  docList: [],
 *  isLoading: false,
 *  error: '',
 * }
 */
const defaultState = {
    docList: [],
    isLoading: false,
    error: '',
};

const docReducer = handleActions(
    {
        [DOC.GET_DOC_LIST_LOADING]: (state, action) => ({
            ...state,
            isLoading: true,
            error: '',
        }),
        [DOC.GET_DOC_LIST_SUCCESS]: (state, action) => ({
            ...state,
            docList: action.payload.data,
            isLoading: false,
        }),
        [DOC.GET_DOC_LIST_ERROR]: (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload.error,
        }),
    },
    defaultState
);

export default docReducer;
