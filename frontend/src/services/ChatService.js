import HttpService from './HttpService.js'


export default {
    loadChat
}



async function loadChat(userId) {
    return HttpService.get('api/chat', userId)
}

