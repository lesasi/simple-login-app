import { axiosObj } from '../utils/axios';

export const createUser = async (obj) => {
    try{
        const response = await axiosObj.post('/new-user', obj);
        return { data: response.data } ;
    } catch(error){
        throw new Error(error.message);
    }
};

export const editUser = async (obj) => {
    try{
        const response = await axiosObj.post('/users/me/edit', obj);
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
