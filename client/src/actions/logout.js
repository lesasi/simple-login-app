import { axiosObj } from '../utils/axios';

const logout = async () => {
    try{
        const response = await axiosObj.post('/logout');
        return { success: true } ;
    }catch(error){
        return { error: error.response.data };
    }
};

export default logout;