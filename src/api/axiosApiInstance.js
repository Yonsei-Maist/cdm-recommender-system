/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

import axios from 'axios';

const axiosApiInstance = axios.create();
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
    (response) => {
        const data = response.data;
        // if fail
        if (
            data.result === 'success' &&
            data.data === undefined &&
            data.message !== undefined
        ) {
            throw new Error(response.data.message);
        }

        // if success
        if (data.result === 'success' && data.data !== undefined) {
            return response.data;
        }
    },
    async function (error) {
        return Promise.reject(new Error(error.message));
    }
);

export default axiosApiInstance;
