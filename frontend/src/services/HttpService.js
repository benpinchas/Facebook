import router from '@/router'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3000/'


import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

async function ajax(endpoint, method='get', data=null, params=null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params
        })
        return res.data;
    } catch (err) {
        if (err.response.status === 401) {
            router.push('/');
        }
        throw err
    }
}

export default {
    get(endpoint, params){
        return ajax(endpoint, 'GET', null, params )
    },
    post(endpoint, data){
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data){
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data){
        return ajax(endpoint, 'DELETE', data)
    }

}


// const BASE_URL = process.env.NODE_ENV === 'production'
//     ? '/'
//     : '//localhost:3000/'


// import Axios from 'axios';
// var axios = Axios.create({
//     withCredentials: true
// });


// async function ajax(endpoint, method='get', data=null) {
//     const res = await axios({
//         url: `${BASE_URL}${endpoint}`,
//         method,
//         data
//     })
//     return res.data;
// }


// export default {
//     ajax
// }