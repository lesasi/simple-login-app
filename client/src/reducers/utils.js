const initialState = {
    notifier: {
        new_message_toggle: false,
        message: null,
        type: ''
    },
    loading: false
};

const utils = (state = initialState, action = {}) => {
    switch(action.type) {
        case 'NEW_MESSAGE': {
            return {
                ...state,
                notifier: {
                    ...state.notifier,
                    new_message_toggle: !state.new_message_toggle,
                    message: action.payload.message,
                    type: action.payload.type
                }
            }
        }
        case 'RESET_MESSAGE': {
            return {
                ...state,
                notifier: {
                    ...state.notifier,
                    new_message: false,
                    message: null
                },
            }
        }
        case 'LOADING': {
            return {
                ...state,
                loading: true
            };
        }
        case 'LOADING_COMPLETE': {
            return {
                ...state,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
};

export default utils;