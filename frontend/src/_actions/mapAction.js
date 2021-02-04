import { CREATE_PLACE, GET_ALL_PLACE, GET_PLACE_FEED } from './types';

import { request } from "../_utils/axios";

const USER_URL = '/place';

export function registerPlace(dataToSubmit) {
    const data = request('post', USER_URL, dataToSubmit);
    return {
        type: CREATE_PLACE,
        payload: data,
    }
}

export function getAllPlace() {
  const data = request('get', USER_URL + '/list');
  return {
    type : GET_ALL_PLACE,
    payload : data,
  }
}

export function getPlaceFeed(dataToSubmit) {
  const id = dataToSubmit
  const data = request('get', USER_URL +`/${id}`);
  return {
    type: GET_PLACE_FEED,
    payload: data,
  }
}