const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    loadChat,
    addMsg
}
/*
async function loadChat(loggedInUserId, user2Id) {
    let collection = await dbService.getCollection('chat')
    try {
        let chat = await collection.findOne({
            $or: [
                { $and: [{ "user1Id": ObjectId(loggedInUserId) }, { "user2Id": ObjectId(user2Id) }] },
                { $and: [{ "user1Id": ObjectId(user2Id) }, { "user2Id": ObjectId(loggedInUserId) }] }
            ]
        })
        if (!chat) {
            chat = _createChat(loggedInUserId, user2Id)
            collection.insertOne(chat)
        }
        console.log('CHAT,', chat)
        return chat
    }catch(err) {
        throw err
    }

} */

async function loadChat(loggedInUserId, user2Id, createIfNotExist=true) {
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
                        { $match: {"_id": ObjectId(user2Id)} },
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








