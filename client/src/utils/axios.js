import axios from 'axios';

export const axiosObj = axios.create({
    withCredentials: true
});