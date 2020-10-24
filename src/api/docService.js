/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

import axiosApiInstance from './axiosApiInstance';

class DocService {
    getDocList(userId) {
        return axiosApiInstance.post(`/emr/doc/list`, {
            userId,
        });
    }

    getDocDetails(docId) {
        return axiosApiInstance.post(`/emr/doc/page`, {
            id: docId,
        });
    }
}

export default new DocService();
