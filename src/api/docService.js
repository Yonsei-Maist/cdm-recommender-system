/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 * @author Chanwoo Gwon, Yonsei Univ, Researcher, since 2020.05. ~
 * @date 2020.10.26
 */

import axiosApiInstance from './axiosApiInstance';

class DocService {
    getDocList(server, userId) {
        return axiosApiInstance.post(server + `/emr/doc/list`, {
            userId,
        });
    }

    getDocDetails(server, docId) {
        return axiosApiInstance.post(server + `/emr/doc/page`, {
            id: docId,
        });
    }

    saveDoc(server, {userId, title, content}) {
        return axiosApiInstance.post(server + `/emr/doc`, {
            userId,
            title,
            content,
        });
    }
}

export default new DocService();
