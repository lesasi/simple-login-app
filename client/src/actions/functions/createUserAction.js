import { firebaseCreateUser } from "../auth";
import { createUser } from "../crud-user";
import { history } from "../../routers";

const createUserAction = (email, password) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'LOADING'
        });

        const { firebaseToken } = await firebaseCreateUser(email, password);
        const { data } = await createUser({
            email,
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

export default createUserAction;