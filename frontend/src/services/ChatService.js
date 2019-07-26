import HttpService from './HttpService.js'


export default {
    loadChatWith
}



async function loadChatWith(userId) {
    return HttpService.get('api/chat', userId)
}

