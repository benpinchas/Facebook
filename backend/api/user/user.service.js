
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


/*

  console.log('filterByfilterBy', filterBy)
    const criteria = {};
    if (filterBy.txt) {
        criteria.username = { $regex: `${filterBy.txt}`, $options: 'i' }
    }

        let limit = (filterBy.limit) ? parseInt(filterBy.limit) : 10

    const collection = await dbService.getCollection('user')
    collection.createIndex({ username: "text" })
    try {
        const users = await collection.find(criteria).limit(limit).toArray();
        const friendshipCollection = await dbService.getCollection('friendship')

        let prmMappedUsers = await users.map(async user => {
            const friendship = await friendshipCollection.findOne({
                $or: [
                    { $and: [{ "user1Id": ObjectId(user._id) }, { "user2Id": ObjectId('5d2ae89cccd9bb8b258c7a99') }] },
                    { $and: [{ "user1Id": ObjectId('5d2ae89cccd9bb8b258c7a99') }, { "user2Id": ObjectId(user._id) }] }
                ]
            })
            user.friendship = friendship
            return user
        })
        return Promise.all(prmMappedUsers)
            .then(res => res)
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
*/

async function query(filterBy = {}, loggedInUserId) {
    console.log('filterByfilterBy', filterBy)

    if (filterBy.isFriendship === "true") {
        const collection = await dbService.getCollection('friendship')
        const friendships = await collection.find({ $or: [{ user1Id: ObjectId(loggedInUserId) }, { user2Id: ObjectId(loggedInUserId) }] }).toArray()
        const userIds = friendships.map(friendship => {
            // console.log(friendship.user1Id.toString() === loggedInUserId)
            let id = (friendship.user1Id.toString() === loggedInUserId) ? friendship.user2Id : friendship.user1Id
            return id
        })

        let orArr = userIds.map(userId => { return { "_id": userId } })

        let prmUsers = userIds.map(userId => {
            return getById(loggedInUserId, userId)
        })
        return Promise.all(prmUsers)
            .then(users => {
                return users
            })

    } else {
        const criteria = {};
        if (filterBy.txt) {
            criteria.username = { $regex: `${filterBy.txt}`, $options: 'i' }
        }
        
        let limit = (filterBy.limit) ? parseInt(filterBy.limit) : 10

        const collection = await dbService.getCollection('user')
        collection.createIndex({ username: "text" })
        try {
            const users = await collection.find(criteria).limit(limit).toArray();
            const friendshipCollection = await dbService.getCollection('friendship')

            let prmMappedUsers = await users.map(async user => {
                const friendship = await friendshipCollection.findOne({
                    $or: [
                        { $and: [{ "user1Id": ObjectId(user._id) }, { "user2Id": ObjectId(loggedInUserId) }] },
                        { $and: [{ "user1Id": ObjectId(loggedInUserId) }, { "user2Id": ObjectId(user._id) }] }
                    ]
                })
                user.friendship = friendship
                return user
            })
            return Promise.all(prmMappedUsers)
                .then(res => res)
        } catch (err) {
            console.log('ERROR: cannot find users')
            throw err;
        }

    }


    return users
    // if (filterBy.isFriendship === "true") {
    //     criteria.
    // }

    /*
    const collection = await dbService.getCollection('friendship')
    const friendships = await collection.find({$or: [{user1Id: ObjectId(loggedInUserId)}, {user2Id:  ObjectId(loggedInUserId)}]}).toArray()
    console.log(friendships)
    const userIds = friendships.map(friendship => {
        // console.log(friendship.user1Id.toString() === loggedInUserId)
        let id = (friendship.user1Id.toString() === loggedInUserId)? friendship.user2Id : friendship.user1Id
        return id
    })
    console.log('userIds', userIds)

    let orArr = userIds.map(userId => {return {"_id" : userId}})
    // console.log(orArr)


    let prmUsers = userIds.map(userId => {
        return getById(loggedInUserId, userId)
    })
    console.log(prmUsers)
    return Promise.all(prmUsers)
        .then(users => {
            console.log('users}}users')
            return users
        })
    */

    // const userCollection =  await dbService.getCollection('user')
    // const users = await userCollection.find({$or: orArr}).toArray()





    console.log("users|users", users)

    // try {
    //     let users = await collection.aggregate([
    //         {
    //             $match: {

    //             }

    //         },
    //         {
    //             $lookup:
    //             {
    //                 from: 'friendship',
    //                 localField: '_id',
    //                 foreignField: 'user2Id',
    //                 as: 'friendship'
    //             }
    //         },
    //         {
    //             $unwind: '$friendship'
    //         },
    //     ]).toArray()
    //     console.log('usersusers',users)
    //     return users
    // }catch(err) {
    //     console.log(err)
    // }


    // ////////////////
    //     let limit = (filterBy.limit) ? parseInt(filterBy.limit) : 10

    //     const collection = await dbService.getCollection('user')
    //     collection.createIndex({ username: "text" })
    //     try {
    //         const users = await collection.find(criteria).limit(limit).toArray();
    //         const friendshipCollection = await dbService.getCollection('friendship')

    //         let prmMappedUsers = await users.map(async user => {
    //             const friendship = await friendshipCollection.findOne({
    //                 $or: [
    //                     { $and: [{ "user1Id": ObjectId(user._id) }, { "user2Id": ObjectId('5d2ae89cccd9bb8b258c7a99') }] },
    //                     { $and: [{ "user1Id": ObjectId('5d2ae89cccd9bb8b258c7a99') }, { "user2Id": ObjectId(user._id) }] }
    //                 ]
    //             })
    //             user.friendship = friendship
    //             return user
    //         })
    //         return Promise.all(prmMappedUsers)
    //             .then(res => res)
    //     } catch (err) {
    //         console.log('ERROR: cannot find users')
    //         throw err;
    //     }
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
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        const friendshipCollection = await dbService.getCollection('friendship')
        const friendship = await friendshipCollection.findOne({
            $or: [
                { $and: [{ "user1Id": ObjectId(loggedInUserId) }, { "user2Id": ObjectId(userId) }] },
                { $and: [{ "user1Id": ObjectId(userId) }, { "user2Id": ObjectId(loggedInUserId) }] }
            ]
        })
        user.friendship = friendship
       
        let friendships = await friendshipCollection.find({
            $or: [{ "user1Id": ObjectId(userId) }, { "user2Id": ObjectId(userId) }],
            $and: [{isApproved: true}]
        }).toArray()

        let friendsIds = friendships.map(friendship => {
            return (friendship.user1Id.equals(ObjectId(userId)))? friendship.user2Id : friendship.user1Id
        })

        let orArr =  friendsIds.map(id => {
            return {"_id": id}
        })

        if (orArr.length) {
            let friends = await collection.find({
                $or: orArr
            }).toArray()
    
            user.friends = friends;
        }else {
            user.friends = []
        }

        
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}


async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.remove({ "_id": ObjectId(userId) })
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
        await collection.replaceOne({ "_id": ObjectId(userId) }, { $set: user })
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


