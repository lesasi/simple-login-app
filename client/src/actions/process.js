import { axiosObj } from '../utils/axios';

const getProcDetails = async () => {
    try {
        const response = await axiosObj.get('/processenv');
        return { data: response.data };
    }catch(error) {
        return { error: error.response.data };
    }
};

export default getProcDetails;