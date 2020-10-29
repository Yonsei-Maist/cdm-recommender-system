/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 * @author Chanwoo Gwon, Yonsei Univ, Researcher, since 2020.05. ~
 * @date 2020.10.26
 */

/**
 * @category Sagas
 * @module sagas/wordSaga
 * @requires '../action-types/wordType'
 * @requires '../api/wordService'
 * @requires '../actions/wordAction'
 */

import { put, call, takeLatest, select } from 'redux-saga/effects';
import WORD from '../action-types/wordType';
import {
    getSimilarWordsSuccess,
    getSimilarWordsError,
} from '../actions/wordAction';
import WordService from '../api/wordService';

/* -------------------------------------------------------------------------- */
/*                    Get similar words List                                  */
/* -------------------------------------------------------------------------- */

const getDefaultSetting = (state) => state.config;

/**
 * @generator
 * @function
 * @description handle saga of get similar words list
 * @param {action} action redux action
 *
 * @yields {Object} CallEffect of WordService.getSimilarWords api
 * @yields {Object} PutEffect of getSimilarWordsSuccess action
 * @yields {Object} PutEffect of getSimilarWordsError action
 */
function* handleGetSimilarWords(action) {
    try {
        let url = (yield select(getDefaultSetting)).get('defaultSetting').APIServer;
        const similarWords = yield call(WordService.getSimilarWords, url, action.payload);
        yield put(getSimilarWordsSuccess(similarWords.data));
    } catch (error) {
        yield put(getSimilarWordsError({ error: error.toString() }));
    }
}

/**
 * @generator
 * @function
 * @description watch saga of similar words list
 *
 * @yields {Object} ForkEffect of handleGetSimilarWords saga
 */
const watchGetSimilarWords = function* () {
    // Does not allow concurrent fetches of data
    yield takeLatest(WORD.GET_SIMILAR_WORDS_REQUEST, handleGetSimilarWords);
};

export { watchGetSimilarWords };
