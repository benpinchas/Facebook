import HttpService from './HttpService.js'
import { async } from 'q';

export default {
    query,
    add,
    save,
}

async function add(friendship) {
    return HttpService.post('api/friendship', friendship)
}

async function save(friendship) {
    return HttpService.post('api/friendship', friendship)
}


async function query(filterBy) {
    return HttpService.get(`api/friendship/`,  filterBy)
}


