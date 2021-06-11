const initialState = {
    redirectTo: '',
    new_message: false,
    message: null
};

const utils = (state = initialState, action = {}) => {
    switch(action.type) {
        case 'REDIRECT': {
            return {
                ...state,
                redirectTo: action.payload.redirectTo
            }
        }
        case 'NEW_MESSAGE': {
            return {
                ...state,
                new_message: true,
                message: action.payload.message
            }
        }
        case 'RESET_MESSAGE': {
            return {
                ...state,
                new_message: false,
                message: null
            }
        }
        default: {
            return state;
        }
    }
};

export default utils;