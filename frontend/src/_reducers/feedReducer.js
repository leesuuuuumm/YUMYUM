import { CREATE_FEED, GET_FEED_INFO, DELETE_FEED, GET_FEED_BY_EMAIL } from "../_actions/types";


const feedReducer = function(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_FEED:
            return { ...state, success: payload };
        case GET_FEED_INFO:
            return { ...state, feedInfoSuccess: payload };
        case GET_FEED_BY_EMAIL:
            return { ...state, feedInfoSuccess: payload };
        case DELETE_FEED:
            return { ...state, deletefeedSuccess: payload };
        default:
            return state;
    }
}

export default feedReducer;