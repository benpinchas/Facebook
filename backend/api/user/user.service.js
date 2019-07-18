
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add,
    makeOwner,
}

function makeOwner(user) {
    if (!user) return null
    return {
        username: user.username,
        userId: user._id,
        profileImg: user.url.profileImg
    }
}

async function query(filterBy = {}) {

    const criteria = {};
    if (filterBy.txt) {
        criteria.username =  {$regex : `${filterBy.txt}`,  $options: 'i'}
        
    }

    let limit = (filterBy.limit)? parseInt(filterBy.limit) : 10

    const collection = await dbService.getCollection('user')
    collection.createIndex( { username: "text" } )
    try {
        const users = await collection.find( criteria).limit(limit).toArray();
        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

// async function getById(userId) {
//     const collection = await dbService.getCollection('user')
//     console.log(userId)
//     try {
//         const user = await collection.findOne({"_id":ObjectId(userId)})
//         return user
//     } catch (err) {
//         console.log(`ERROR: while finding user ${userId}`)
//         throw err;
//     }
// }

async function getById(loggedInUserId, userId) {
    const collection = await dbService.getCollection('user')
    console.log(userId)
    try {
        const user = await collection.findOne({"_id":ObjectId(userId)})
        const friendshipCollection  =  await dbService.getCollection('friendship')
        const friendship = await friendshipCollection.findOne({
            $or: [
                {$and: [{"user1": ObjectId(loggedInUserId)}, {"user2": ObjectId(userId)}]},
                {$and: [{"user1": ObjectId(userId)}, {"user2": ObjectId(loggedInUserId)}]}
            ]
        })
        user.friendship = friendship
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
} 


async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({email})
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.remove({"_id":ObjectId(userId)})
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}



async function update(user) {
    const collection = await dbService.getCollection('user')
    let userId = user._id
    delete user._id
    try {
        await collection.replaceOne({"_id":ObjectId(userId)}, {$set : user})
        user._id = userId
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}


