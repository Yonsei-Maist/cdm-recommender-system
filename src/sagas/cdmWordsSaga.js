import { put, call, takeLatest } from 'redux-saga/effects';
import { CDM_WORDS } from '../action-types';
import { fetchCdmWords } from '../api';
import {
    setLoadCdmWordsSuccess,
    setLoadCdmWordsError,
} from '../actions/cdmWordsAction';

function* handleLoardCdmWords(action) {
    try {
        const loadData = yield call(fetchCdmWords, action.markedWord);
        yield put(setLoadCdmWordsSuccess(loadData));
    } catch (error) {
        yield put(setLoadCdmWordsError(error.toString()));
    }
}

export default function* watchLordCdmWords() {
    // Does not allow concurrent fetches of data
    yield takeLatest(CDM_WORDS.LOAD_CDM_WORDS_LOADING, handleLoardCdmWords);
}
