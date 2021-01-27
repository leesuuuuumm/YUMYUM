import { CREATE_FEED, GET_FEED_INFO, DELETE_FEED, GET_FEED_BY_EMAIL, CREATE_VIDEO, GET_ALL_FEED } from './types';

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

export function getFeedByEmail(dataToSubmit) {
    const email = dataToSubmit
    const data = request("get", USER_URL + `/list/${email}`);
    return {
      type: GET_FEED_BY_EMAIL,
      payload: data,
    };
  }

export function getAllFeed() {
    const data = request("get", USER_URL + `/list`);
    return {
      type: GET_ALL_FEED,
      payload: data,
    };
  }

export function deleteFeed(dataToSubmit) {
    const id = dataToSubmit
    const data = request("delete", USER_URL + `/${id}`);
    return {
      type: DELETE_FEED,
      payload: data,
    };
  }

export function registerVideo(dataToSubmit) {
    for (let value of dataToSubmit.values()) {
      console.log(value);
    }
    const data = request('post', USER_URL+ `/video`, dataToSubmit);
    return {
        type: CREATE_VIDEO,
        payload: data,
    }
}

