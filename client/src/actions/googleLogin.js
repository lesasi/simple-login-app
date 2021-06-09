import { auth, firebase, googleProvider } from '../utils/firebase-config';
import { axiosObj } from '../utils/axios';

const googleLogin = () => async (dispatch, getState) => {
    try {
        const result = await auth.signInWithPopup(googleProvider);
        const token = await auth?.currentUser?.getIdToken(true);
        dispatch({
            type: 'SET_GOOGLE_TOKEN',
            payload: {
                token
            }
        });
        const response = await axiosObj.post('/googleLogin', {
            token
        });
        console.log(response)
    } catch (error) {
        console.log(error)
    }
};

export default googleLogin;