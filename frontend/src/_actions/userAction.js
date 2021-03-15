import { REGISTER_USER, LOGIN_USER, RESETPASSWORD_USER, LOGOUT_USER, GET_USER_INFO, UPDATE_USER_INFO, GET_LIKE_FEEDS_INFO } from './types';
import { request } from "../_utils/axios";
import { setToken } from "../../src/_utils/setToken"
const config = setToken()

const USER_URL = '/account';

export function registerUser(dataToSubmit) {
    const data = request('post', USER_URL , dataToSubmit);
    return {
        type: REGISTER_USER,
        payload: data,
    }
}

export function loginUser(dataToSubmit) {
    const data = request("post", USER_URL + "/login/", dataToSubmit);
    return {
      type: LOGIN_USER,
      payload: data,
    };
  }


export function resetPassword(dataToSubmit) {
  const data = request("put", USER_URL + "/password/", dataToSubmit, config);
  return {
    type: RESETPASSWORD_USER,
    payload: data,
  };
}

export function getUser(dataToSubmit) {
  const email = dataToSubmit
  const data = request("get", USER_URL + `/${email}`);
  return {
    type: GET_USER_INFO,
    payload: data,
  };
}

export function logoutUser() {
  localStorage.removeItem('jwt-token')
  localStorage.removeItem('loggedInfo')
  return { 
    type: LOGOUT_USER 
  };
}

export function updateUser(dataToSubmit) {
  const data = request("put", USER_URL, dataToSubmit);
  return {
    type: UPDATE_USER_INFO,
    payload: data
  }
}

export function getLikeFeeds(dataToSubmit){
  const email = dataToSubmit
  const data = request("get", USER_URL + `/${email}` + "/likeFeeds");
  return {
    type: GET_LIKE_FEEDS_INFO,
    payload: data
  }
}

