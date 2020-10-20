/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

import axiosApiInstance from './axiosApiInstance';
import { API_BASE_ADDRESS } from '../constants';

class DocService {
    getDocList(userId) {
        return axiosApiInstance.post(`${API_BASE_ADDRESS}/emr/doc/list`, {
            userId,
        });
    }
}

export default new DocService();
