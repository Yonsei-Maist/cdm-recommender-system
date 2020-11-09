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
    getEmrCdmRelationshipSuccess,
    getEmrCdmRelationshipError,
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

/* -------------------------------------------------------------------------- */
/*                    Get Emr-Cdm Relationship List                           */
/* -------------------------------------------------------------------------- */
/**
 * @generator
 * @function
 * @description handle saga of get Emr-Cdm Relationship list
 * @param {action} action redux action
 *
 * @yields {Object} CallEffect of WordService.getEmrCdmRelationship api
 * @yields {Object} PutEffect of getEmrCdmRelationshipSuccess action
 * @yields {Object} PutEffect of getEmrCdmRelationshipError action
 */
function* handleGetEmrCdmRelationship(action) {
    try {
        let url = (yield select(getDefaultSetting)).get('defaultSetting').APIServer;
        // action.payload -> currentPageNo
        const emrCdmRelationship = yield call(WordService.getEmrCdmRelationship, url, action.payload);
        yield put(getEmrCdmRelationshipSuccess(emrCdmRelationship.data));
    } catch (error) {
        yield put(getEmrCdmRelationshipError({ error: error.toString() }));
    }
}

/**
 * @generator
 * @function
 * @description watch saga of Emr-Cdm Relationship list
 *
 * @yields {Object} ForkEffect of handleGetEmrCdmRelationship saga
 */
const watchGetEmrCdmRelationship = function* () {
    // Does not allow concurrent fetches of data
    yield takeLatest(WORD.GET_EMR_CDM_RELATIONSHIP_REQUEST, handleGetEmrCdmRelationship);
};


export { watchGetSimilarWords, watchGetEmrCdmRelationship };
