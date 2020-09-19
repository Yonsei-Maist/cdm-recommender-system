import { put, call, takeLatest } from 'redux-saga/effects';
import { USER_DATA } from '../action-types';
import { fetchUserData } from '../api';
import {
    setLoadUserDataSuccess,
    setLoadUserDataError,
} from '../actions/userDataAction';

function* handleLoardUserData() {
    try {
        const loadData = yield call(fetchUserData);
        yield put(setLoadUserDataSuccess(loadData));
    } catch (error) {
        yield put(setLoadUserDataError(error.toString()));
    }
}

export default function* watchLordUserData() {
    // Does not allow concurrent fetches of data
    yield takeLatest(USER_DATA.LOAD_USER_DATA_LOADING, handleLoardUserData);
}
