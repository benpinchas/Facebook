const ChatService = require('./chat.service.js')

module.exports = {
    loadChat,
    getInboxMsgs
}


async function loadChat(req, res) {
    let loggedInUserId = req.session.user._id
    let user2Id = req.query.userId 
    try {
        let chat = await ChatService.loadChat(loggedInUserId, user2Id)
        res.json(chat)
    }catch(err) {
        console.log('ERROR: loadChat controller', err)
    }
    console.log('user1Id user2Id', loggedInUserId, user2Id)
  
}

async function getInboxMsgs(req, res) {
    let loggedInUserId = req.session.user._id
    try {
        let inboxMsgs = await ChatService.getInboxMsgs(loggedInUserId)
        console.log(inboxMsgs)
        res.json(inboxMsgs)
    }catch(err) {
        console.log('ERROR: getInbox', err)
    }
}





