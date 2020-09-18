import { CDM_WORDS } from '../action-types';

const loadCdmWords = (markedWord) => ({
    type: CDM_WORDS.LOAD_CDM_WORDS_LOADING,
    markedWord,
});

const setLoadCdmWordsSuccess = (data) => ({
    type: CDM_WORDS.LOAD_CDM_WORDS_SUCCESS,
    data,
});

const setLoadCdmWordsError = (error) => ({
    type: CDM_WORDS.LOAD_CDM_WORDS_ERROR,
    error,
});

export { loadCdmWords, setLoadCdmWordsSuccess, setLoadCdmWordsError };