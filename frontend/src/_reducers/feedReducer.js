import {
    CREATE_FEED,
    GET_FEED, 
    DELETE_FEED, 
    GET_FEEDCALENDAR_BY_EMAIL, 
    CREATE_VIDEO, 
    GET_FEEDS } from "../_actions/types";

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
        case GET_FEED:
            return { ...state, feedInfo: payload };

        case GET_FEEDCALENDAR_BY_EMAIL:
            return { ...state, 
                feedsCalenadarInfo: {
                status: payload.status,
                message: payload.message,
                data: payload.data,
                object: payload.object,
            }};
        case GET_FEEDS:
            return { ...state, 
                feedInfoSuccess: {
                status: payload.status,
                message: payload.message,
                data: payload.data,
                object: payload.object,
            } };
        case DELETE_FEED:
            return { ...state, 
                deletefeedSuccess: {
                status: payload.status,
                message: payload.message,
                data: payload.data,
                object: payload.object,
            } };
        case CREATE_VIDEO:
            return { ...state, 
                createVideoSuccess: {
                status: payload.status,
                message: payload.message,
                data: payload.data,
                object: payload.object,
            } };
        default:
            return state;
    }
}

export default feedReducer;
