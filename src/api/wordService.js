/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 * @author Chanwoo Gwon, Yonsei Univ, Researcher, since 2020.05. ~
 * @date 2020.10.26
 */

import axiosApiInstance from './axiosApiInstance';

class WordService {
    getSimilarWords(server, word, timeout = 70) {
        return axiosApiInstance.post(
            server + `/cdm/similarity/words`,
            {
                word,
            },
            { timeout }
        );
    }
}

export default new WordService();
