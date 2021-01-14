import { REGISTER_USER, LOGIN_USER, RESETPASSWORD_USER } from './types';
import { request } from "../utils/axios";

const USER_URL = '/account';

export function registerUser(dataToSubmit) {
    const data = request('post', USER_URL + '/user/', dataToSubmit);
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
    const data = request("put", USER_URL + "/password/", dataToSubmit);
    return {
      type: RESETPASSWORD_USER,
      payload: data,
    };
  }