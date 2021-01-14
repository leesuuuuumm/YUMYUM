import axios from 'axios';

const DOMAIN = 'http://localhost:8080'
// axios.defaults.withCredentials = true;

export const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data,
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

// const Api = axios.create({
//     url: DOMAIN,
// });
// export default Api;

// Api활용
// import Api from 'api/Api';
// Api.get('/user/', { params: {} })
//  .then(res => this.setState())