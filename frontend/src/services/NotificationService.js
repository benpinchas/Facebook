import HttpService from './HttpService.js'

export default {
    query,
}


async function query() {
    return HttpService.ajax('api/notification', 'get')
}








