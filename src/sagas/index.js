import { all } from 'redux-saga/effects';

import loadUserDataSaga from './loadUserDataSaga';
import loadCdmWordsSaga from './loadCdmWordsSaga';

export default function* rootSaga() {
    yield all([loadUserDataSaga(), loadCdmWordsSaga()]);
}
