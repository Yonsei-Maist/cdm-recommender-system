const API_BASE_ADDRESS = 'http://localhost:4000';

const fetchUserData = async () => {
    const uri = API_BASE_ADDRESS + '/user-data';
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
    const uri = API_BASE_ADDRESS + `/cdm-words-${markedWord}`;
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
