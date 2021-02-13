import jwt_decode from "jwt-decode";

export const setToken = () => {
  const token = localStorage.getItem("jwt-token")

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  return config
}

export const getEmail = () => {
  let token = localStorage.getItem("jwt-token");
  let decode = jwt_decode(token);
  return decode.email;
}