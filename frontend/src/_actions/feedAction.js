import { CREATE_FEED, GET_FEED_INFO } from './types';

import { request } from "../_utils/axios";

const USER_URL = '/feed';

export function registerFeed(dataToSubmit) {
    const data = request('post', USER_URL, dataToSubmit);
    return {
        type: CREATE_FEED,
        payload: data,
    }
}

export function getFeed(dataToSubmit) {
    const id = dataToSubmit
    const data = request("get", USER_URL + `/${id}`);
    return {
      type: GET_FEED_INFO,
      payload: data,
    };
  }