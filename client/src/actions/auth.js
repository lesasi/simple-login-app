import { auth, firebase, providers } from '../utils/firebase-config';
import { axiosObj } from '../utils/axios';

export const firebaseCreateUser = async (email, password) => {
    try {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        // const firebaseToken = user.credential.idToken;
        const firebaseToken = await auth?.currentUser?.getIdToken(true);
        return {
            firebaseToken,
            user
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const firebaseLogin = async (email, password) => {
    try {
        const user = await auth.signInWithEmailAndPassword(email, password);
        // const firebaseToken = user.credential.idToken;
        const firebaseToken = await auth?.currentUser?.getIdToken(true);
        return {
            firebaseToken,
            user
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const firebaseSignInWithPopup = async (provider_name='google') => {
    try {
        const user = await auth.signInWithPopup(providers[provider_name]);
        // const firebaseToken = user.credential.idToken;
        const firebaseToken = await auth?.currentUser?.getIdToken(true);

        // check if already signed in
        const isNewUser = user.additionalUserInfo.isNewUser;
        const email = user.user?.email;

        // if either its a new user or email is null, we can see that the provider 
        // hasnt been linked for that user - delete the user and throw error
        if(isNewUser || email === null) {
            await firebaseLogout();
            axiosObj.post('/users/firebaseDelete', { token: firebaseToken })
                .catch(() => console.log('Error in deleting user'));
            throw new Error("User doesn't exist, or hasn't linked their account with the given provider. Please login another way.");
        }
        return {
            user, 
            firebaseToken
        }
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

export const firebaseChangePassword = async (old_password, new_password) => {
    try {
        // reauthenticate with firebase
        const user = auth?.currentUser;
        const cred = providers['email'].credential(user.email, old_password);
        await user.reauthenticateWithCredential(cred);
    
        const result = await user.updatePassword(new_password);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const firebaseLinkProviderWithPopup = async (provider_name='google') => {
    try {
        const user = auth?.currentUser;
        const result = await user.linkWithPopup(providers[provider_name]);
        return { user: result.user };
    } catch (error) {
        throw new Error(error.message);
    }
};