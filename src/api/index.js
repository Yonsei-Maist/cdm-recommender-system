import { API_URL_USER_DATA, API_URL_CDM_WORDS } from '../constants';

const fetchUserData = async () => {
    const uri = API_URL_USER_DATA;
    const response = await fetch(uri, {
        method: 'GET',
    });
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }

    return data;
};

const fetchCdmWords = async (markedWord) => {
    const uri = `${API_URL_CDM_WORDS}${markedWord}`;
    const response = await fetch(uri, {
        method: 'GET',
    });
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }

    return data;
};

export { fetchUserData, fetchCdmWords };
