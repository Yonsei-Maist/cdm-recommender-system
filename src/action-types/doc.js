/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

/**
 * @description DOC action types
 * @constant
 * @type {Object}
 * @property {string} GET_DOC_LIST_LOADING get doc list loading action type
 * @property {string} GET_DOC_LIST_SUCCESS get doc list success action type
 * @property {string} GET_DOC_LIST_ERROR get doc list error action type
 * @default {
 *      GET_DOC_LIST_LOADING: 'GET_DOC_LIST_LOADING',
 *      GET_DOC_LIST_SUCCESS: 'GET_DOC_LIST_SUCCESS',
 *      GET_DOC_LIST_ERROR: 'GET_DOC_LIST_ERROR',
 * }
 */
const DOC = {
    GET_DOC_LIST_LOADING: 'GET_DOC_LIST_LOADING',
    GET_DOC_LIST_SUCCESS: 'GET_DOC_LIST_SUCCESS',
    GET_DOC_LIST_ERROR: 'GET_DOC_LIST_ERROR',
    GET_DOC_DETAILS_REQUEST: 'GET_DOC_DETAILS_REQUEST',
    GET_DOC_DETAILS_SUCCESS: 'GET_DOC_DETAILS_SUCCESS',
    GET_DOC_DETAILS_ERROR: 'GET_DOC_DETAILS_ERROR',
};

export default DOC;
