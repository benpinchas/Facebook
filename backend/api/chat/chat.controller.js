const ChatService = require('./chat.service.js')

module.exports = {
    loadChat
}


async function loadChat(req, res) {
    let user1Id = req.query.userId
    let user2Id = req.session.user._id
    try {
        let chat = await ChatService.loadChat(user1Id, user2Id)
        res.json(chat)
    }catch(err) {
        console.log('ERROR: loadChat controller', err)
    }
    console.log('user1Id user2Id', user1Id, user2Id)
  
}





