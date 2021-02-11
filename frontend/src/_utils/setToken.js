import jwt_decode from "jwt-decode";

export const setToken = () => {
  const token = localStorage.getItem("loggedInfo")

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  return config
}

export const getEmail = () => {
  let token = localStorage.getItem("loggedInfo");
  let decode = jwt_decode(token);
  return decode.email;
}