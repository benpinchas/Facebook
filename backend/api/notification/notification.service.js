const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const SocketService = require('../../services/socket.service')

module.exports = {
    query,
    save,
    update
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

//TODO: merge with save
async function update(notification) {
    let criteria = {"_id": ObjectId(notification._id)}
    delete notification._id
    notification.userId = ObjectId(notification.userId)
    notification.postId = ObjectId(notification.postId )
    let collection  = await dbService.getCollection('notification')
    try {
        await collection.updateOne(criteria, {$set: notification})
        console.log('UPDATED ONE!')
    }catch(err) {
        throw err
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




