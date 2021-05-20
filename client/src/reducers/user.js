const initialState = {
    logged_in: false,
    loading: false
};

const user = (state = initialState, action = {}) => {
    switch(action.type) {
        case 'LOGIN': {
            return {
                ...state,
                logged_in: true,
                ...action.payload.user
            };
        }
        case 'LOGOUT': {
            return initialState;
        }
        case 'INIT_USER': {
            return {
                ...state,
                logged_in: true,
                loading: false,
                ...action.payload
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

export default user;