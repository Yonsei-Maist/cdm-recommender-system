import { CDM_WORDS } from '../action-types';

const loadCdmWords = (markedWord) => ({
    type: CDM_WORDS.LOAD_CDM_WORDS_LOADING,
    markedWord,
});

const setLoadCdmWordsSuccess = (cdmWords) => ({
    type: CDM_WORDS.LOAD_CDM_WORDS_SUCCESS,
    cdmWords,
});

const setLoadCdmWordsError = (error) => ({
    type: CDM_WORDS.LOAD_CDM_WORDS_ERROR,
    error,
});

export { loadCdmWords, setLoadCdmWordsSuccess, setLoadCdmWordsError };