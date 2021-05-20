import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const kfetch = async (url, body, type = 'GET') => {
    const options = {
		method: type,
		withCredentials: true,
        data: JSON.stringify(body),
    };
    return axios(url, options);
};


export const axiosObj = axios.create({
    baseURL,
    withCredentials: true
});