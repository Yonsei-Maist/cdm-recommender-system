/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 * @author Chanwoo Gwon, Yonsei Univ, Researcher, since 2020.05. ~
 * @date 2020.10.26
 */

import axiosApiInstance from './axiosApiInstance';

class WordService {

    // getSearchWord to verify if word is emr word
    getSearchWord(server, word, timeout = 0) {
        return axiosApiInstance.post(
            server + `/cdm/words`,
            {
                word,
            },
            { timeout }
        );
    }

    // default is `0` (no timeout)
    getSimilarWords(server, id, timeout = 0) {
        return axiosApiInstance.post(
            server + `/cdm/similarity/words`,
            {
                id,
            },
            { timeout }
        );
    }

    getEmrCdmRelationship(server, currentPageNo) {
        return axiosApiInstance.post(server + `/cdm/words/list`, {
            currentPageNo,
        });
    }
}

export default new WordService();
