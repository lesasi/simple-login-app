import { axiosObj } from '../utils/axios';

export const createUser = async (obj) => {
    try{
        const response = await axiosObj.post('/new-user', obj);
        return { data: response.data } ;
    } catch(error){
        const err_message = error.response.data.error || error.message;
        throw new Error(err_message);
    }
};

export const editUser = async (obj) => {
    try{
        const response = await axiosObj.post('/users/me/edit', obj);
        return { data: response.data } ;
    }catch(error){
        const err_message = error.response.data.error || error.message;
        throw new Error(err_message);
    }
};

export const deleteUser = async () => {
    try{
        const response = await axiosObj.post('/users/me/delete');
        return { data: response.data } ;
    }catch(error){
        const err_message = error.response.data.error || error.message;
        throw new Error(err_message);
    }
};
