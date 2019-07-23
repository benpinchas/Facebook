import HttpService from './HttpService.js'
import { async } from 'q';

export default {
    query,
    setAllSeen
}


async function query() {
    return HttpService.get('api/notification')
}


async function setAllSeen() {
    return  HttpService.put('api/notification/seen')
}





