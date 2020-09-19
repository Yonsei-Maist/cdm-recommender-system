import { USER_DATA } from '../action-types';

const loadUserData = () => ({
    type: USER_DATA.LOAD_USER_DATA_LOADING,
});

const setLoadUserDataSuccess = (data) => ({
    type: USER_DATA.LOAD_USER_DATA_SUCCESS,
    data,
});

const setLoadUserDataError = (error) => ({
    type: USER_DATA.LOAD_USER_DATA_ERROR,
    error,
});

export { loadUserData, setLoadUserDataSuccess, setLoadUserDataError };
