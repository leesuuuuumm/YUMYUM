import { REGISTER_USER, LOGIN_USER } from "../_actions/types";


const userReducer = function(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_USER:
            return { ...state, success: payload };
        case LOGIN_USER:
            return { ...state, loginSuccess: payload };
        default:
            return state;
    }
}

export default userReducer;