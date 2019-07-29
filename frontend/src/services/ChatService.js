import HttpService from './HttpService.js'


export default {
    loadChatWith,
    getInboxMsgs
}

async function loadChatWith(userId) {
    return await HttpService.get('api/chat', userId)
}


async function getInboxMsgs() {
    return await HttpService.get('api/chat/inbox')
}




