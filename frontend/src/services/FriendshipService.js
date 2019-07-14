import HttpService from './HttpService.js'
import { async } from 'q';

export default {
    getSuggests,
    add
}

async function add(friendship) {
    return HttpService.ajax('api/friendship', 'post', friendship)
}


async function getSuggests(userId) {
    // return  HttpService.ajax('api/frienship', 'get', {userId, isFriends: false})
}
