const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    loadChat,
    addMsg
}

async function loadChat(user1Id, user2Id) {
    let collection = await dbService.getCollection('chat')
    try {
        let chat = await collection.findOne({
            $or: [
                { $and: [{ "user1Id": ObjectId(user1Id) }, { "user2Id": ObjectId(user2Id) }] },
                { $and: [{ "user1Id": ObjectId(user2Id) }, { "user2Id": ObjectId(user1Id) }] }
            ]
        })
        if (!chat) {
            chat = _createChat(user1Id, user2Id)
            collection.insertOne(chat)
        }
        console.log('CHAT,', chat)
        return chat
    }catch(err) {
        throw err
    }

}


async function addMsg(msg, chatId) {
    let collection = await dbService.getCollection('chat')
    try {
        let chat = await collection.findOne({"_id": ObjectId(chatId)})
        chat.msgs.push(msg)
        await collection.replaceOne({"_id": ObjectId(chatId)}, chat)
        console.log('chat', chat)
    }catch(err) {
        throw err
    }
   
}




function _createChat(user1Id, user2Id) {
    return {
        user1Id: ObjectId(user1Id),
        user2Id: ObjectId(user2Id),
        msgs: [],
        updatedAt: Date.now()
    }
}








