/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

/**
 * @category Sagas
 * @module sagas/docSaga
 * @requires '../action-types/docType'
 * @requires '../actions/docAction'
 * @requires '../actions/contentAction'
 * @requires '../api/docService'
 */

import { put, call, takeLatest } from 'redux-saga/effects';
import DOC from '../action-types/docType';
import {
    getDocListSuccess,
    getDocListError,
    getDocDetailsSuccess,
    getDocDetailsError,
} from '../actions/docAction';
import {setContent} from '../actions/contentAction';
import DocService from '../api/docService';

/* -------------------------------------------------------------------------- */
/*                                  Doc List                                  */
/* -------------------------------------------------------------------------- */
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
        yield put(getDocListError({ error: error.toString() }));
    }
}

/**
 * @generator
 * @function
 * @description watch saga of get doc list
 *
 * @yields {Object} ForkEffect of handleGetDocList saga
 */
const watchGetDocList = function* () {
    // Does not allow concurrent fetches of data
    yield takeLatest(DOC.GET_DOC_LIST_REQUEST, handleGetDocList);
};

/* -------------------------------------------------------------------------- */
/*                                 Doc Details                                */
/* -------------------------------------------------------------------------- */
/**
 * @generator
 * @function
 * @description handle saga of get doc details
 * @param {action} action redux action
 *
 * @yields {Object} CallEffect of DocService.getDocDetails api
 * @yields {Object} PutEffect of getDocDetailsSuccess action
 * @yields {Object} PutEffect of getDocDetailsError action
 */
function* handleGetDocDetails(action) {
    try {
        const docDetails = yield call(DocService.getDocDetails, action.payload);
        yield put(getDocDetailsSuccess(docDetails));
        yield put(setContent(docDetails.data.content));
    } catch (error) {
        yield put(getDocDetailsError({ error: error.toString() }));
    }
}

/**
 * @generator
 * @function
 * @description watch saga of get doc details
 *
 * @yields {Object} ForkEffect of handleGetDocDetails saga
 */
const watchGetDocDetails = function* () {
    // Does not allow concurrent fetches of data
    yield takeLatest(DOC.GET_DOC_DETAILS_REQUEST, handleGetDocDetails);
};

export { watchGetDocList, watchGetDocDetails };
