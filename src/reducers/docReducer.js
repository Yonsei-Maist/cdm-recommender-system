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
 *      docList: {
 *          data: [],
 *          isLoading: false,
 *          error: '',
 *      },
 *      docDetails: {
 *          data: {},
 *          isLoading: false,
 *          error: '',
 *      },
 * }
 */
const defaultState = {
    docList: {
        data: [],
        isLoading: false,
        error: '',
    },
    docDetails: {
        data: {},
        isLoading: false,
        error: '',
    },
};

const docReducer = handleActions(
    {
        // Doc List
        [DOC.GET_DOC_LIST_REQUEST]: (state, action) => ({
            ...state,
            docList: {
                ...state.docList,
                isLoading: true,
                error: '',
            },
        }),
        [DOC.GET_DOC_LIST_SUCCESS]: (state, action) => ({
            ...state,
            docList: {
                ...state.docList,
                data: action.payload.data,
                isLoading: false,
            },
        }),
        [DOC.GET_DOC_LIST_ERROR]: (state, action) => ({
            ...state,
            docList: {
                ...state.docList,
                isLoading: false,
                error: action.payload.error,
            },
        }),
        // Doc Details
        [DOC.GET_DOC_DETAILS_REQUEST]: (state, action) => ({
            ...state,
            docDetails: {
                ...state.docDetails,
                isLoading: true,
                error: '',
            },
        }),
        [DOC.GET_DOC_DETAILS_SUCCESS]: (state, action) => ({
            ...state,
            docDetails: {
                ...state.docDetails,
                data: action.payload.data,
                isLoading: false,
            },
        }),
        [DOC.GET_DOC_DETAILS_ERROR]: (state, action) => ({
            ...state,
            docDetails: {
                ...state.docDetails,
                isLoading: false,
                error: action.payload.error,
            },
        }),
    },
    defaultState
);

export default docReducer;
