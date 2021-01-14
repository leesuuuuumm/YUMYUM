import { REGISTER_USER, LOGIN_USER } from "../_actions/types";


const userReducer = function(state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, success: action.payload };
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
        default:
            return state;
    }
}

export default userReducer;