/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.19
 */

/**
 * @category Sagas
 * @module sagas/cdmWordsSaga
 * @requires 'redux-saga/effects'
 * @requires '../action-types'
 * @requires '../api'
 * @requires '../actions/cdmWordsAction'
 * @requires '../actions/keywordsMaptoCdmWordsAction'
 */

import { put, call, takeLatest } from 'redux-saga/effects';
import { CDM_WORDS } from '../action-types';
import { fetchCdmWords } from '../api';
import {
    setLoadCdmWordsSuccess,
    setLoadCdmWordsError,
} from '../actions/cdmWordsAction';
import { setKeywordsMaptoCdmWords } from '../actions/keywordsMaptoCdmWordsAction';

/**
 * @generator
 * @function
 * @description handle saga of load CDM words
 * @param {action} action redux action
 * 
 * @yields {Object} CallEffect of fetchCdmWords api
 * @yields {Object} PutEffect of setLoadCdmWordsSuccess action
 * @yields {Object} PutEffect of setKeywordsMaptoCdmWords action
 */
function* handleLoadCdmWords(action) {
    try {
        const keyword = action.markedWord;
        const cdmWords = yield call(fetchCdmWords, keyword);
        yield put(setLoadCdmWordsSuccess(cdmWords));
        yield put(setKeywordsMaptoCdmWords({ keyword, cdmWords }));
    } catch (error) {
        yield put(setLoadCdmWordsError(error.toString()));
    }
}

/**
 * @generator
 * @function
 * @description watch saga of load CDM words
 * 
 * @yields {Object} ForkEffect of handleLoadCdmWords saga
 */
export default function* watchLoadCdmWords() {
    // Does not allow concurrent fetches of data
    yield takeLatest(CDM_WORDS.LOAD_CDM_WORDS_LOADING, handleLoadCdmWords);
}
