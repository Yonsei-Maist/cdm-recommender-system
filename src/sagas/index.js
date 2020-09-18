import { all } from 'redux-saga/effects';

import loadUserDataSaga from './loadUserDataSaga';

export default function* rootSaga() {
    yield all([loadUserDataSaga()]);
}
