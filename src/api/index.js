/**
 * @file
 * @author phorvicheka <phorvicheka@yahoo.com>
 * @date 2020-09-18
 */

/**
 * @category API
 * @module api
 */

 /**
  * @constant
  * @type {string}
  * @description API base address
  */
import { API_URL_USER_DATA, API_URL_CDM_WORDS } from '../constants';

/**
 * @method
 * @description fetch user data
 * 
 * @returns {object} user data object
 */
const fetchUserData = async () => {
    const uri = API_URL_USER_DATA;
    const response = await fetch(uri, {
        method: 'GET',
    });
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }

    return data;
};

/**
 * @method
 * @description fetch CDM words
 * @param {string} markedWord marked word or keyword to fetch an array of CDM words
 * 
 * @returns {Array} array of CDM word object
 */
const fetchCdmWords = async (markedWord) => {
    const uri = `${API_URL_CDM_WORDS}${markedWord}`;
    const response = await fetch(uri, {
        method: 'GET',
    });
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }

    return data;
};

export { fetchUserData, fetchCdmWords };
