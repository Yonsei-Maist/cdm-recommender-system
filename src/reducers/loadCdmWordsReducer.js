import { CDM_WORDS } from '../action-types';

const initialState = {
    data: [],
    isLoading: false,
    error: '',
};

const loardCdmWordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CDM_WORDS.LOAD_CDM_WORDS_LOADING: {
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        }
        case CDM_WORDS.LOAD_CDM_WORDS_SUCCESS: {
            return {
                ...state,
                data: action.data,
                isLoading: false,
            };
        }
        case CDM_WORDS.LOAD_CDM_WORDS_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        }
        default: {
            return state;
        }
    }
};

export default loardCdmWordsReducer;
