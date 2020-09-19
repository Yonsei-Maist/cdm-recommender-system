import { KEYWORDS_MAPTO_CDM_WORDS } from '../action-types';

const setKeywordsMaptoCdmWords = ({ keyword, cdmWords }) => ({
    type: KEYWORDS_MAPTO_CDM_WORDS.SET_KEYWORDS_MAPTO_CDM_WORDS,
    keyword,
    cdmWords,
});

export { setKeywordsMaptoCdmWords };
