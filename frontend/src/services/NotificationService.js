import HttpService from './HttpService.js'
import { async } from 'q';

export default {
    query,
    setAllSeen,
    update
}


async function query() {
    return HttpService.get('api/notification')
}


async function setAllSeen() {
    // return  HttpService.put('api/notification/seen')
}

async function update(notification) {
    return HttpService.put('api/notification', notification)
}





