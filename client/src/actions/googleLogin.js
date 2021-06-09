import { auth, firebase, googleProvider } from '../utils/firebase-config';
import { axiosObj } from '../utils/axios';

const googleLogin = async () => {
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

export default googleLogin;