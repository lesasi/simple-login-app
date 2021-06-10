import { axiosObj } from '../utils/axios';

const deleteUser = async () => {
    try{
        const response = await axiosObj.post('/users/me/delete');
        return { data: response.data } ;
    }catch(error){
        return { error: error.response.data };
    }
};

export default deleteUser;