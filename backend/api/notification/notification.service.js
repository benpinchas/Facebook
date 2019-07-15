const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    save
}

async function save(notification) {
    console.log(notification)
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
    }catch(err) {
        console.log('ERRORL: while saveing notification', err)
    }
}


async function query(userId) {
    let collection  = await dbService.getCollection('notification')
    try {
        let notifications = await collection.find({userId}).toArray()        
        return notifications
    }catch(err) {
        console.log('db notifications error')
        throw err
    }
}



