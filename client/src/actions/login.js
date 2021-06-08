import { axiosObj } from '../utils/axios';

const login = async (username, password) => {
    try{
        const response = await axiosObj.post('/login', {
            username,
            password
        });
        return { data: response.data } ;
    }catch(error){
        return { error: error.response.data };
    }
};

export default login;