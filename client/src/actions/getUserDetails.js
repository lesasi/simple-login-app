import { axiosObj } from '../utils/axios';

const getUserDetails = async () => {
    try {
        const response = await axiosObj.get('/users/me');
        return { data: response.data };
    }catch(error) {
        return { error: error.response.data };
    }
};

export default getUserDetails;