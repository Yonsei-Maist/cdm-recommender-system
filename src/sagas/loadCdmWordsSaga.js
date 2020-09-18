import { put, call, takeLatest } from 'redux-saga/effects';
import { CDM_WORDS } from '../action-types';
import { fetchCdmWords } from '../api';
import {
    setLoadCdmWordsSuccess,
    setLoadCdmWordsError,
} from '../actions/loadCdmWordsAction';

function* handleLoardCdmWords(action) {
    try {
        console.log(action);
        const loadData = yield call(fetchCdmWords, action.markedWord);
        yield put(setLoadCdmWordsSuccess(loadData));
    } catch (error) {
        console.log(error);
        console.log(error.toString());
        yield put(setLoadCdmWordsError(error.toString()));
    }
}

export default function* watchLordCdmWords() {
    // Does not allow concurrent fetches of data
    yield takeLatest(CDM_WORDS.LOAD_CDM_WORDS_LOADING, handleLoardCdmWords);
}
