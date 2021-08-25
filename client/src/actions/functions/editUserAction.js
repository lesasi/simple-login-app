import { editUser } from "../crud-user";
import { history } from "../../routers";

const editUserAction = (payload) => async (dispatch, getState) => {
    try { 
        dispatch({
            type: 'LOADING'
        });

        const { data } = await editUser(payload);
        
        dispatch({
            type: 'LOADING_COMPLETE'
        });

        dispatch({
            type: 'EDIT_USER',
            payload: {
                user: data.user
            }
        });

        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                message: 'Details saved!',
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

export default editUserAction;