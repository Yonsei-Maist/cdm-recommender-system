/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

/**
 * @description DOC action types
 * @constant
 * @type {Object}
 * @property {string} GET_SIMILAR_WORDS_REQUEST get similar words request action type
 * @property {string} GET_SIMILAR_WORDS_SUCCESS get similar words success action type
 * @property {string} GET_SIMILAR_WORDS_ERROR get similar words error action type
 * @default {
 *      GET_SIMILAR_WORDS_REQUEST: 'GET_SIMILAR_WORDS_REQUEST',
 *      GET_SIMILAR_WORDS_SUCCESS: 'GET_SIMILAR_WORDS_SUCCESS',
 *      GET_SIMILAR_WORDS_ERROR: 'GET_SIMILAR_WORDS_ERROR',
 * }
 */
const WORD = {
    GET_SIMILAR_WORDS_REQUEST: 'GET_SIMILAR_WORDS_REQUEST',
    GET_SIMILAR_WORDS_SUCCESS: 'GET_SIMILAR_WORDS_SUCCESS',
    GET_SIMILAR_WORDS_ERROR: 'GET_SIMILAR_WORDS_ERROR',
};

export default WORD;
