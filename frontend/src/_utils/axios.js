import axios from 'axios';
import { setToken } from "../../src/_utils/setToken"
import React from "react";

export const DOMAIN = 'https://i4b101.p.ssafy.io'
const PORT = ':8800'
// export const DOMAIN = 'http://localhost'
// const PORT = ':8080'

export const request = (method, url, data = {}, config, props) => {
    axios.defaults.headers["Authorization"] = localStorage.getItem("jwt-token");
    return axios({
        method,
        url: DOMAIN + PORT + url,
        data,
        config
    })
    .then((res) => {
        return res.data
    })
    .catch((error) => {
      if (error.response.data) {
        if(error.response.data.message === "jwt unauthorized"){
          localStorage.removeItem("jwt-token");
          localStorage.removeItem("loggedInfo");
          window.location.reload();
        } else {
          return error.response.data
        }
      }
    });
};

// const Api = axios.create({
//     url: DOMAIN + PORT,
// });
// export default Api;

// Api활용
// import Api from 'api/Api';
// Api.get('/user/', { params: {} })
//  .then(res => this.setState())