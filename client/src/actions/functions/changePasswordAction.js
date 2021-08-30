import { firebaseChangePassword } from "../auth";
import { history } from "../../routers";

const changePasswordAction = (old_password, new_password) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'LOADING'
        });

        const result = await firebaseChangePassword(old_password, new_password);
        
        dispatch({
            type: 'LOADING_COMPLETE'
        });

        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                message: 'Password saved correctly!',
                type: 'SUCCESS'
            }
        });

        // redirect to home page
        history.push('/');
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

export default changePasswordAction;