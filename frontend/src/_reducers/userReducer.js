import { REGISTER_USER, LOGIN_USER, RESETPASSWORD_USER, GET_USER_INFO, UPDATE_USER_INFO } from "../_actions/types";


const userReducer = function(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_USER:
            return { ...state, registerSuccess: {
                status: payload.status,
                message: payload.message,
                data: payload.data,
                object: payload.object,
            } };
        case LOGIN_USER:
            return { ...state, loginSuccess: {
                status: payload.status,
                message: payload.message,
                data: payload.data,
                object: payload.object,
            } };
        case RESETPASSWORD_USER:
            return { ...state, passwordSuccess: {
                status: payload.status,
                message: payload.message,
                data: payload.data,
                object: payload.object,
            } };
        case GET_USER_INFO:
            return { ...state, userInfoSuccess: {
                status: payload.status,
                message: payload.message,
                data: payload.data,
                object: payload.object,
            } };
        case UPDATE_USER_INFO:
            return { ...state, userUpdateSuccess: {
                status: payload.status,
                message: payload.message,
                data: payload.data,
                object: payload.object,
            }};
        default:
            return state;
    }
}

export default userReducer;