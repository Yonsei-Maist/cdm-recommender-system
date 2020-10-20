/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

/**
 * @category Sagas
 * @module sagas/docSaga
 * @requires '../action-types/doc'
 * @requires '../api/docService'
 * @requires '../actions/docAction'
 */

import { put, call, takeLatest } from 'redux-saga/effects';
import DOC from '../action-types/doc';
import { getDocListSuccess, getDocListError } from '../actions/docAction';
import DocService from '../api/docService';

/**
 * @generator
 * @function
 * @description handle saga of get doc list
 * @param {action} action redux action
 *
 * @yields {Object} CallEffect of DocService.getDocList api
 * @yields {Object} PutEffect of getDocListSuccess action
 * @yields {Object} PutEffect of getDocListError action
 */
function* handleGetDocList() {
    try {
        const docList = yield call(DocService.getDocList, 'doctor1');
        yield put(getDocListSuccess(docList));
    } catch (error) {
        yield put(getDocListError(error.toString()));
    }
}

/**
 * @generator
 * @function
 * @description watch saga of get doc list
 *
 * @yields {Object} ForkEffect of handleGetDocList saga
 */
export default function* watchGetDocList() {
    // Does not allow concurrent fetches of data
    yield takeLatest(DOC.GET_DOC_LIST_LOADING, handleGetDocList);
}
