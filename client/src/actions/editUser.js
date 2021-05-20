import { axiosObj } from '../utils/axios';

const createUser = async (userObj) => {
    try{
        const response = await axiosObj.post('/new-user', userObj);
        return { data: response.data } ;
    }catch(error){
        return { error: error.response.data };
    }
};

export default createUser;