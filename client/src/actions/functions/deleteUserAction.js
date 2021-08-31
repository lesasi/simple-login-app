import { history } from "../../routers";
import { deleteUser } from "../crud-user";

const deleteUserAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'LOADING',
            payload: {
                loadingMessage: 'Deleting User...'
            }
        });
        
        await deleteUser();
        
        dispatch({
            type: 'LOGOUT'
        });

        dispatch({
            type: 'LOADING_COMPLETE'
        });

        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                message: 'Deleted user!',
                type: 'SUCCESS'
            }
        });
        
        history.push('/login');
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

export default deleteUserAction;