/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

import axiosApiInstance from './axiosApiInstance';
import { API_BASE_ADDRESS } from '../constants';

class WordService {
    getSimilarWords(word) {
        return axiosApiInstance.post(`${API_BASE_ADDRESS}/cdm/similarity/words`, {
            word,
        });
    }
}

export default new WordService();
