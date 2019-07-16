import HttpService from './HttpService.js'

export default {
    query,
}


async function query() {
    return HttpService.get('api/notification')
}








