const initialState = {
    logged_in: true,
    loading: false
};

const user = (state = initialState, action = {}) => {
    switch(action.type) {
        case 'LOGOUT': {
            return {
                ...initialState,
                logged_in: false
            };
        }
        case 'INIT_USER': {
            return {
                ...state,
                logged_in: true,
                ...action.payload.user
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
        case 'EDIT_USER': {
            return {
                ...state,
                ...action.payload.data
            };
        }
        case 'SET_GOOGLE_TOKEN': {
            return {
                ...state,
                google_token: action.payload.token
            }
        }
        default: {
            return state;
        }
    }
};

export default user;