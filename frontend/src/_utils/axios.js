import axios from 'axios';

// const DOMAIN = 'http://i4b101.p.ssafy.io/yumyum'
const DOMAIN = 'http://18.191.183.197:8080/backend'
// const DOMAIN = 'http://localhost:8080'

export const request = (method, url, data, config = {}) => {
    console.log(url, 'axios요청 보냅니다아아아 이 데이터를!', data)
    console.log(config)
    return axios({
        method,
        url: DOMAIN + url,
        data,
        config
    })
    .then((res) => {
        console.log('axios응답', res.data)
        return res.data
    })
    .catch((error) => {
      console.log(error.response.data)
      console.log('axios 에러ㅜㅜ')
    });
};

// const Api = axios.create({
//     url: DOMAIN,
// });
// export default Api;

// Api활용
// import Api from 'api/Api';
// Api.get('/user/', { params: {} })
//  .then(res => this.setState())