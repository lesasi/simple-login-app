const initialState = {
    redirectTo: '',
    new_message_toggle: false,
    message: null,
    type: ''
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
                new_message_toggle: !state.new_message_toggle,
                message: action.payload.message,
                type: action.payload.type
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