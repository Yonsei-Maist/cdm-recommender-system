/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.18
 */

/**
 * @category Sagas
 * @module sagas/index
 * @requires 'redux-saga/effects'
 * @requires './userDataSaga'
 * @requires './cdmWordsSaga'
 * @requires './docSaga'
 */

import { all } from 'redux-saga/effects';

import userDataSaga from './userDataSaga';
import cdmWordsSaga from './cdmWordsSaga';
import * as docSaga from './docSaga';
import * as wordSaga from './wordSaga';

/**
 * @generator
 * @function
 * @description root saga of all sagas
 *
 * @yields {Object} AllEffect of sagas
 */
export default function* rootSaga() {
    yield all([
        userDataSaga(),
        cdmWordsSaga(),
        docSaga.watchGetDocList(),
        docSaga.watchGetDocDetails(),
        wordSaga.watchGetSimilarWords(),
    ]);
}
