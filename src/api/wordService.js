/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

import axiosApiInstance from './axiosApiInstance';

class WordService {
    getSimilarWords(word) {
        return axiosApiInstance.post(
            `/cdm/similarity/words`,
            {
                word,
            },
            { timeout: 50 }
        );
    }
}

export default new WordService();
