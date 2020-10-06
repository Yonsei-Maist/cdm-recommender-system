/**
 * @category Action Type
 * @module action-types
 */

/**
 * @description USER_DATA action types
 * @constant
 * @type {Object}
 * @property {string} LOAD_USER_DATA_LOADING load user data loading action type
 * @property {string} LOAD_USER_DATA_SUCCESS load user data success action type
 * @property {string} LOAD_USER_DATA_ERROR load user data error action type
 * @property {string} SET_USER_INPUT_TEXT set user input text action type
 * @default {
 *      LOAD_USER_DATA_LOADING: 'LOAD_USER_DATA_LOADING',
 *      LOAD_USER_DATA_SUCCESS: 'LOAD_USER_DATA_SUCCESS',
 *      LOAD_USER_DATA_ERROR: 'LOAD_USER_DATA_ERROR',
 *      SET_USER_INPUT_TEXT: 'SET_USER_INPUT_TEXT',
 * }
 */
const USER_DATA = {
    LOAD_USER_DATA_LOADING: 'LOAD_USER_DATA_LOADING',
    LOAD_USER_DATA_SUCCESS: 'LOAD_USER_DATA_SUCCESS',
    LOAD_USER_DATA_ERROR: 'LOAD_USER_DATA_ERROR',
    SET_USER_INPUT_TEXT: 'SET_USER_INPUT_TEXT',
};

/**
 * @description CDM_WORDS action types
 * @constant
 * @type {Object}
 * @property {string} LOAD_CDM_WORDS_LOADING load CDM words loading action type
 * @property {string} LOAD_CDM_WORDS_SUCCESS load CDM words success action type
 * @property {string} LOAD_CDM_WORDS_ERROR load CDM words error action type
 * @default {
 *      LOAD_CDM_WORDS_LOADING: 'LOAD_CDM_WORDS_LOADING',
 *      LOAD_CDM_WORDS_SUCCESS: 'LOAD_CDM_WORDS_SUCCESS',
 *      LOAD_CDM_WORDS_ERROR: 'LOAD_CDM_WORDS_ERROR',
 * }
 */
const CDM_WORDS = {
    LOAD_CDM_WORDS_LOADING: 'LOAD_CDM_WORDS_LOADING',
    LOAD_CDM_WORDS_SUCCESS: 'LOAD_CDM_WORDS_SUCCESS',
    LOAD_CDM_WORDS_ERROR: 'LOAD_CDM_WORDS_ERROR',
};

/**
 * @description KEYWORDS_MAPTO_CDM_WORDS action types
 * @constant
 * @type {Object}
 * @property {string} SET_KEYWORDS_MAPTO_CDM_WORDS set keywords mapto CDM words action type
 * @default {
 *      SET_KEYWORDS_MAPTO_CDM_WORDS: 'SET_KEYWORDS_MAPTO_CDM_WORDS',
 * }
 */
const KEYWORDS_MAPTO_CDM_WORDS = {
    SET_KEYWORDS_MAPTO_CDM_WORDS: 'SET_KEYWORDS_MAPTO_CDM_WORDS',
};

export { USER_DATA, CDM_WORDS, KEYWORDS_MAPTO_CDM_WORDS };
