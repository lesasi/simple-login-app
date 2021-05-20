import { axiosObj } from '../utils/axios';

const login = async (email, password) => {
    try{
        const response = await axiosObj.post('/login', {
            email,
            password
        });
        return { data: response.data } ;
    }catch(error){
        return { error: error.response.data };
    }
};

export default login;