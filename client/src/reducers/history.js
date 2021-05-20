const initialState = {
    redirectTo: ''
};

const history = (state = initialState, action = {}) => {
    switch(action.type) {
        case 'REDIRECT': {
            return {
                ...state,
                redirectTo: action.payload.redirectTo
            }
        }
        default: {
            return state;
        }
    }
};

export default history;