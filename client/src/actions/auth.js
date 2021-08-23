import { auth, firebase, googleProvider } from '../utils/firebase-config';
import { axiosObj } from '../utils/axios';

export const createNewFirebaseUser = async (email, password) => {
    try {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        const fireBaseToken = await auth?.currentUser?.getIdToken(true);
        return {
            fireBaseToken,
            user
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

export const firebaseLogin = async (email, password) => {
    try {
        const user = await auth.signInWithEmailAndPassword(email, password);
        const fireBaseToken = await auth?.currentUser?.getIdToken(true);
        return {
            fireBaseToken,
            user
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const firebaseLogout = async () => {
    try{
        await auth.signOut()
        return { success: true } ;
    }catch(error){
        return { error: error.response.data };
    }
};

export const googlePopupSignIn = async () => {
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