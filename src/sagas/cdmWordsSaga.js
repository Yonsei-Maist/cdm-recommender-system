import { put, call, takeLatest } from 'redux-saga/effects';
import { CDM_WORDS } from '../action-types';
import { fetchCdmWords } from '../api';
import {
    setLoadCdmWordsSuccess,
    setLoadCdmWordsError,
} from '../actions/cdmWordsAction';
import { setKeywordsMaptoCdmWords } from '../actions/keywordsMaptoCdmWordsAction';

function* handleLoardCdmWords(action) {
    try {
        const keyword = action.markedWord;
        const cdmWords = yield call(fetchCdmWords, keyword);
        yield put(setLoadCdmWordsSuccess(cdmWords));
        yield put(setKeywordsMaptoCdmWords({ keyword, cdmWords }));
    } catch (error) {
        yield put(setLoadCdmWordsError(error.toString()));
    }
}

export default function* watchLordCdmWords() {
    // Does not allow concurrent fetches of data
    yield takeLatest(CDM_WORDS.LOAD_CDM_WORDS_LOADING, handleLoardCdmWords);
}
