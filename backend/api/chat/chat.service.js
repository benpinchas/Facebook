const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    loadChat,
    getInboxMsgs,
    addMsg
}

async function loadChat(loggedInUserId, user2Id, createIfNotExist = true) {
    let collection = await dbService.getCollection('chat')
    try {
        let results = await collection.aggregate([
            {
                $match: {
                    $or: [
                        { $and: [{ "user1Id": ObjectId(loggedInUserId) }, { "user2Id": ObjectId(user2Id) }] },
                        { $and: [{ "user1Id": ObjectId(user2Id) }, { "user2Id": ObjectId(loggedInUserId) }] }
                    ]
                }
            },
            {
                $lookup: {
                    from: "user",
                    pipeline: [
                        { $match: { "_id": ObjectId(user2Id) } },
                    ],
                    as: "user"
                }
            },
            { $unwind: "$user" },
        ]).toArray()
        if (!results.length && createIfNotExist) {
            let chat = _createChat(loggedInUserId, user2Id)
            await collection.insertOne(chat)
            return loadChat(loggedInUserId, user2Id, false)
        }
        return results[0]
    } catch (err) {
        throw err
    }

}









async function getInboxMsgs(loggedInUserId) {
    let collection = await dbService.getCollection('chat')
    let userCollection = await dbService.getCollection('user')
    try {
        let chats = await collection.find({
            $or: [{ "user1Id": ObjectId(loggedInUserId) }, { "user2Id": ObjectId(loggedInUserId) }]
        }).toArray()
        
        chats = chats.filter(chat => chat.msgs[chat.msgs.length-1])

        prmInboxMsgs = chats.map(async chat => {
            console.log(chat.user1Id.toString()  === loggedInUserId, chat.user1Id.toString() , loggedInUserId)
            let user = (chat.user1Id.toString()  === loggedInUserId) ? 
            await userCollection.findOne ({"_id": ObjectId(chat.user2Id)}) : 
            await userCollection.findOne ({"_id": ObjectId(chat.user1Id)}) 

            return {chatId: chat._id, msg: chat.msgs[chat.msgs.length-1], user}
        })

        return Promise.all(prmInboxMsgs)
            .then(inboxMsgs => inboxMsgs.sort((prmInboxMsg1, prmInboxMsg2) => prmInboxMsg2.msg.at - prmInboxMsg1.msg.at))
    } catch (err) {
        throw err
    }
}

async function addMsg(msg, chatId) {
    let collection = await dbService.getCollection('chat')
    try {
        await collection.updateOne(
            { "_id": ObjectId(chatId) },
            { $push: { msgs: msg } }
        )
    } catch (err) {
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








