import { USER_DATA } from '../action-types';

const initialState = {
    data: [],
    isLoading: false,
    error: '',
    inputText: '',
};

const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_DATA.LOAD_USER_DATA_LOADING: {
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        }
        case USER_DATA.LOAD_USER_DATA_SUCCESS: {
            return {
                ...state,
                data: action.data,
                isLoading: false,
            };
        }
        case USER_DATA.LOAD_USER_DATA_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        }
        case USER_DATA.SET_USER_INPUT_TEXT: {
            return {
                ...state,
                inputText: action.inputText,
            };
        }
        default: {
            return state;
        }
    }
};

export default userDataReducer;
