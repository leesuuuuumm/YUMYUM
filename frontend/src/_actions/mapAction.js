import { CREATE_PLACE, GET_FEED_INFO, DELETE_FEED, GET_FEED_BY_EMAIL, CREATE_VIDEO, GET_ALL_FEED } from './types';

import { request } from "../_utils/axios";

const USER_URL = '/place';

export function registerPlace(dataToSubmit) {
    const data = request('post', USER_URL, dataToSubmit);
    return {
        type: CREATE_PLACE,
        payload: data,
    }
}