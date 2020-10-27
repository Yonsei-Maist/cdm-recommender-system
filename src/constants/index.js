/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.06
 */

/**
 * @category Constants
 * @module constants
 */

/**
 * @constant
 * @type {string=} http
 */
const SCHEME = 'http';

/**
 * @constant
 * @type {string=} localhost
 */
const HOST = 'localhost';

/**
 * @constant
 * @type {string=} 8080
 */
const PORT = '8080';

/**
 * @constant
 * @type {string=} ${SCHEME}://${HOST}:${PORT}
 */
export const API_BASE_ADDRESS =
  process.env.REACT_APP_DOCKER_COMPOSE === 'true'
    ? 'http://localhost:3050/api'
    : `${SCHEME}://${HOST}:${PORT}/`;

/**
 * @constant
 * @type {string=} ${API_BASE_ADDRESS}/user-data
 */
export const API_URL_USER_DATA = `${API_BASE_ADDRESS}/user-data`;

/**
 * @constant
 * @type {string=} ${API_BASE_ADDRESS}/cdm-words-
 */
export const API_URL_CDM_WORDS = `${API_BASE_ADDRESS}/cdm-words-`;


/**
 * @constant
 * @type {string=} handleOnClickMarkedWord
 */
export const METHOD_NAME_ONCLICK_MARKED_WORD = 'handleOnClickMarkedWord';
