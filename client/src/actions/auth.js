import { auth, firebase, googleProvider } from '../utils/firebase-config';
import { axiosObj } from '../utils/axios';

export const googleLogin = async () => {
    try {
        const result = await auth.signInWithPopup(googleProvider);
        const token = await auth?.currentUser?.getIdToken(true);
        const response = await axiosObj.post('/googleLogin', {
            token
        });
        return { data: response.data }
    } catch (error) {
        return { error: error.message }
    }
};

export const setGoogleEmail = async () => {
    try {
        if(auth.currentUser) {
            return { data: auth.currentUser };
        }
        const result = await auth.signInWithPopup(googleProvider);
        const token = await auth?.currentUser?.getIdToken(true);
        const response = await axiosObj.post('/setGoogleToken', {
            token
        });
        return { data: response.data }
    } catch (error) {
        return { error: error.message }
    }
};

export const login = async (username, password) => {
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

export const logout = async () => {
    try{
        await axiosObj.post('/logout');
        await auth.signOut()
        return { success: true } ;
    }catch(error){
        return { error: error.response.data };
    }
};