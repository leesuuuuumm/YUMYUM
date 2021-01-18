<<<<<<< HEAD
import { REGISTER_USER, LOGIN_USER, RESETPASSWORD_USER, LOGOUT_USER, GET_USER } from './types';
=======
import { REGISTER_USER, LOGIN_USER, RESETPASSWORD_USER, GET_USER_INFO, UPDATE_USER_INFO } from './types';
>>>>>>> 68574348e55544a62ba68d718a9bb32c90fe4f5e
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

export function getUser(dataToSubmit) {
  const email = dataToSubmit
<<<<<<< HEAD
  const data = request("get", USER_URL + `/user/${email}`, dataToSubmit);
  console.log("이메일 데이타")
  console.log(data)
  return {
    type: GET_USER,
    payload: data,
  };
}

export function logoutUser() {
  localStorage.removeItem('loggedInfo')
  return { 
    type: LOGOUT_USER 
  };
=======
  const data = request("get", USER_URL +`/user/${email}`);
  return {
    type : GET_USER_INFO,
    payload: data
  }
}

export function updateUser(dataToSubmit) {
  const data = request("put", USER_URL + "/user/", dataToSubmit);
  return {
    type: UPDATE_USER_INFO,
    payload: data
  }
>>>>>>> 68574348e55544a62ba68d718a9bb32c90fe4f5e
}