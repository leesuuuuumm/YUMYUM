import { CREATE_FEED, GET_FEED_INFO } from "../_actions/types";


const feedReducer = function(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_FEED:
            return { ...state, success: payload };
            case GET_FEED_INFO:
                return { ...state, feedInfoSuccess: payload };
        default:
            return state;
    }
}

export default feedReducer;