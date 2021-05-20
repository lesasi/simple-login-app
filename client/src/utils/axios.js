import axios from 'axios';

export const kfetch = async (url, body, type = 'GET') => {
    const options = {
		method: type,
		withCredentials: true,
        data: JSON.stringify(body),
    };
    return axios(url, options);
};


export const axiosObj = axios.create({
    withCredentials: true
});