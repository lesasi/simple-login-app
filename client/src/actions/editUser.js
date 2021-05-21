import { axiosObj } from '../utils/axios';

const editUser = async (userObj) => {
    try{
        const response = await axiosObj.post('/users/me/edit', userObj);
        return { data: response.data } ;
    }catch(error){
        return { error: error.response.data };
    }
};

export default editUser;