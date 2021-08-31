import { history } from "../../routers";
import { firebaseLogout } from "../auth";

const logoutUserAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'LOADING',
            payload: {
                loadingMessage: 'Logging out...'
            }
        });

        await firebaseLogout();

        dispatch({
            type: 'LOADING_COMPLETE'
        });

        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                message: 'Logged out successfully!',
                type: 'SUCCESS'
            }
        });
        history.push('/login')
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
        return;            
    }
};

export default logoutUserAction;