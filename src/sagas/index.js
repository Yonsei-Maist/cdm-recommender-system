import { all } from 'redux-saga/effects';

import userDataSaga from './userDataSaga';
import cdmWordsSaga from './cdmWordsSaga';

export default function* rootSaga() {
    yield all([userDataSaga(), cdmWordsSaga()]);
}
