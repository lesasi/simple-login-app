import { history } from "../../routers";
import { firebaseSignInWithPopup } from "../auth";
import { loginUser } from "../crud-user";

const loginUserPopupAction = (provider_name) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'LOADING'
        });

        const { firebaseToken } = await firebaseSignInWithPopup(provider_name);
        // const { data } = await loginUser({
        //     token: firebaseToken
        // });

        // dispatch({
        //     type: 'INIT_USER',
        //     payload: {
        //         user: data.user
        //     }
        // });

        dispatch({
            type: 'LOADING_COMPLETE'
        });
        
        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                message: 'Created account successfully!',
                type: 'SUCCESS'
            }
        });
        // Redirect to home page
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

export default loginUserPopupAction;