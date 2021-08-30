import { firebaseLogin } from "../auth";
import { loginUser } from "../crud-user";

const loginUserAction = (email, password) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'LOADING'
        });
        const { firebaseToken } = await firebaseLogin(email, password);
        const { data } = await loginUser({
            token: firebaseToken
        });

        dispatch({
            type: 'INIT_USER',
            payload: {
                user: data.user
            }
        });
        
        dispatch({
            type: 'LOADING_COMPLETE'
        });
        
        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                message: 'Logged in successfully!',
                type: 'SUCCESS'
            }
        });
    } catch (error) {
        const err_message = error.message;
        dispatch({
            type: 'LOADING_COMPLETE'
        });
        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                message: err_message,
                type: 'ERROR'
            }
        });
    }
};

export default loginUserAction;