/**
 * @category Sagas
 * @module sagas/index
 * @requires 'redux-saga/effects'
 * @requires './userDataSaga'
 * @requires './cdmWordsSaga'
 */

import { all } from 'redux-saga/effects';

import userDataSaga from './userDataSaga';
import cdmWordsSaga from './cdmWordsSaga';

/**
 * @generator
 * @function
 * @description root saga of all sagas
 * 
 * @yields {Object} AllEffect of sagas
 */
export default function* rootSaga() {
    yield all([userDataSaga(), cdmWordsSaga()]);
}
