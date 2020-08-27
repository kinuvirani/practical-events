import {signUp, signIn} from '../actions/actionType';

const init = {
    token: ''
};

export default (state=init, action) => {
    switch (action.type) {
        case signUp:
            return {
                ...state,
                // user: action.payload
            };
        case signIn:
            return {
                ...state,
                token: action.payload.token
            };
        default:
            return state
    }
}

