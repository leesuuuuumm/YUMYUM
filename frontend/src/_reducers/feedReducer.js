import { CREATE_FEED, GET_FEED_INFO, DELETE_FEED, GET_FEED_BY_EMAIL, CREATE_VIDEO, GET_ALL_FEED } from "../_actions/types";

const initialState = {
    feedsCalenadarInfo: {
        data: null,
    },
}

const feedReducer = function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_FEED:
            return { ...state, success: payload };
        case GET_FEED_INFO:
            return { ...state, feedInfoSuccess: payload };
        case GET_FEED_BY_EMAIL:
            return { ...state, feedsCalenadarInfo: {
                status: payload.status,
                message: payload.message,
                data: payload.data,
                object: payload.object,
            } };
        case GET_ALL_FEED:
            return { ...state, feedInfoSuccess: payload };
        case DELETE_FEED:
            return { ...state, deletefeedSuccess: payload };
        case CREATE_VIDEO:
            return { ...state, createVideoSuccess: payload };
        default:
            return state;
    }
}

export default feedReducer;