/**
 * @file
 * @author phorvicheka <phorvicheka@yahoo.com>
 * @date 2020-09-19
 */

/**
 * @category Actions
 * @module actions/userDataAction
 * @requires ../action-types
 */
import { USER_DATA } from '../action-types';

/**
 * @method
 * @description load user data loading action
 *
 * @returns {object} {type: USER_DATA.LOAD_USER_DATA_LOADING}
 */
const loadUserData = () => ({
    type: USER_DATA.LOAD_USER_DATA_LOADING,
});

/**
 * @method
 * @description set load user data success action
 *
 * @returns {object} {type: USER_DATA.LOAD_USER_DATA_SUCCESS, data}
 */
const setLoadUserDataSuccess = (data) => ({
    type: USER_DATA.LOAD_USER_DATA_SUCCESS,
    data,
});

/**
 * @method
 * @description set load user data error action
 *
 * @returns {Object} {type: USER_DATA.LOAD_USER_DATA_ERROR, error}
 */
const setLoadUserDataError = (error) => ({
    type: USER_DATA.LOAD_USER_DATA_ERROR,
    error,
});

/**
 * @method
 * @description set user input text
 * @param {string} inputText user input text
 *
 * @returns {Object} {type: USER_DATA.SET_USER_INPUT_TEXT, inputText}
 */
const setUserInputText = (inputText) => ({
    type: USER_DATA.SET_USER_INPUT_TEXT,
    inputText,
});

export {
    loadUserData,
    setLoadUserDataSuccess,
    setLoadUserDataError,
    setUserInputText,
};
