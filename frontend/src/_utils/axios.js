import axios from 'axios';

export const DOMAIN = 'https://i4b101.p.ssafy.io'
// export const DOMAIN = 'https://localhost'
const PORT = ':9090/'

export const request = (method, url, data, config = {}) => {
    console.log(url, 'axios요청 보냅니다아아아 이 데이터를!', data)
    console.log(config)

    // for (let key of data.keys()) {
    //   console.log(key);
    // }
    return axios({
        method,
        url: DOMAIN + PORT + url,
        data,
        config
    })
    .then((res) => {
        console.log('axios응답', res.data)
        return res.data
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data
      }
      console.log('axios 에러ㅜㅜ')
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