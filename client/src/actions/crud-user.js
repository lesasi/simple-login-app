import { axiosObj } from '../utils/axios';

export const createUser = async (userObj) => {
    try{
        const response = await axiosObj.post('/new-user', userObj);
        return { data: response.data } ;
    }catch(error){
        return { error: error.response.data };
    }
};

export const editUser = async (userObj) => {
    try{
        const response = await axiosObj.post('/users/me/edit', userObj);
        return { data: response.data } ;
    }catch(error){
        return { error: error.response.data };
    }
};

export const deleteUser = async () => {
    try{
        const response = await axiosObj.post('/users/me/delete');
        return { data: response.data } ;
    }catch(error){
        return { error: error.response.data };
    }
};
