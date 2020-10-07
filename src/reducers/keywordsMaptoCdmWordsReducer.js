/**
 * @file
 * @author phorvicheka <phorvicheka@yahoo.com>
 * @date 2020-09-19
 */

/**
 * @category Reducers
 * @module reducers/keywordsMaptoCdmWordsReducer
 * @requires '../action-types'
 */
import { KEYWORDS_MAPTO_CDM_WORDS } from '../action-types';

/**
 * @function
 * @description reducer for keywordsMaptoCdmWords state
 * @param {Object} state={} redux state
 * @param {Object} action redux action related to KEYWORDS_MAPTO_CDM_WORDS from '../action-types'
 */
const keywordsMaptoCdmWordsReducer = (state = {}, action) => {
    switch (action.type) {
        case KEYWORDS_MAPTO_CDM_WORDS.SET_KEYWORDS_MAPTO_CDM_WORDS: {
            const isExistKeyword = action.keyword in state;
            return (
                !isExistKeyword && {
                    ...state,
                    [action.keyword]: action.cdmWords,
                }
            );
        }
        default: {
            return state;
        }
    }
};

export default keywordsMaptoCdmWordsReducer;
