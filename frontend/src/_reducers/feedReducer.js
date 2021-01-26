import { CREATE_FEED, GET_FEED_INFO, DELETE_FEED, GET_FEED_BY_EMAIL, CREATE_VIDEO, GET_ALL_FEED, CREATE_PLACE } from "../_actions/types";


const feedReducer = function(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_FEED:
            return { ...state, success: payload };
        case GET_FEED_INFO:
            return { ...state, feedInfoSuccess: payload };
        case GET_FEED_BY_EMAIL:
            return { ...state, feedInfoSuccess: payload };
        case GET_ALL_FEED:
            return { ...state, feedInfoSuccess: payload };
        case DELETE_FEED:
            return { ...state, deletefeedSuccess: payload };
        case CREATE_VIDEO:
            return { ...state, createVideoSuccess: payload };
        case CREATE_PLACE:
            return { ...state, createPlaceSuccess: payload };
        default:
            return state;
    }
}

export default feedReducer;