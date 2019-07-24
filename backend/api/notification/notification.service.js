const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const SocketService = require('../../services/socket.service')

module.exports = {
    query,
    save,
    setAllSeen
}

async function save(notification) {
    let collection  = await dbService.getCollection('notification')
    try {
        const {postId, userId, type} = notification
        let oldNotification =  await collection.findOne({postId, userId, type})
        console.log('OLD!',oldNotification)
        if (oldNotification) {
            await collection.replaceOne({"_id":ObjectId(oldNotification._id)}, {$set : notification})
        } else {
            await collection.insertOne(notification)
        }
        SocketService.emit(userId, 'new notification', notification)
    }catch(err) {
        console.log('ERRORL: while saveing notification', err)
    }
}


async function query(userId) {
    let collection  = await dbService.getCollection('notification')
    try {
        let notifications = await collection.find({userId: ObjectId(userId)}).sort( { at: -1 } ).toArray()        
        return notifications
    }catch(err) {
        console.log('db notifications error')
        throw err
    }
}


async function setAllSeen(userId) {
    let collection  = await dbService.getCollection('notification')
    try {
        let notifications = await collection.find({userId: ObjectId(userId)}).toArray() 
        notifications.forEach(async notification => {
            notification.isSeen = true
            await collection.replaceOne({ "_id": ObjectId(userId) }, { $set: notification })
        })
        
        return {}
    }catch(err) {
        console.log('db notifications error')
        throw err
    }
}



