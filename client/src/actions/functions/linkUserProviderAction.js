import { history } from "../../routers";
import { firebaseLinkProviderWithPopup } from "../auth";

const linkUserProviderAction = (provider_name) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'LOADING',
            payload: {
                loadingMessage: 'Opening provider in another window...'
            }
        });

        const { user } = await firebaseLinkProviderWithPopup(provider_name);
        
        dispatch({
            type: 'LOADING_COMPLETE'
        });

        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                message: 'Provider linked successfully!',
                type: 'SUCCESS'
            }
        });

    } catch (error) {
        const err_message = error.message;
        console.log(error)
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

export default linkUserProviderAction;