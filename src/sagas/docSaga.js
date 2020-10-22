/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

/**
 * @category Sagas
 * @module sagas/docSaga
 * @requires '../action-types/docType'
 * @requires '../api/docService'
 * @requires '../actions/docAction'
 * @requires '../actions/userDataAction'
 * @requires '../helpers'
 * @requires '../constants'
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
import { setUserInputText } from '../actions/userDataAction';
import DocService from '../api/docService';
import { highlightTextWithOnClickHandler } from '../helpers';
import { METHOD_NAME_ONCLICK_MARKED_WORD } from '../constants';

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
        const arrayWords = docDetails.data.content.arr_words.map((word) => {
            if (word.id_word_emr !== undefined) {
                return highlightTextWithOnClickHandler(
                    word.str_text,
                    METHOD_NAME_ONCLICK_MARKED_WORD
                );
            }
            return word.str_text;
        });
        const userInputText = arrayWords.join('');//.replace(/\s([!.?,;:'"])/g, '$1');
        yield put(getDocDetailsSuccess(docDetails));
        yield put(setContent(docDetails.data.content));
        yield put(setUserInputText(userInputText));
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
