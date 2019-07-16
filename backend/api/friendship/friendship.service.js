const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    save,
}


async function query(userId) {

    // const criteria = {};
    // if (filterBy.user2Id) {
    //     criteria["user2.userId"] = filterBy.user2Id   
    // }
    // if (filterBy.isApproved) {
    //     criteria.isApproved = (filterBy.isAprroved === "true")? true : false;
    // }

    const collection = await dbService.getCollection('friendship')
    try {
        let friendships = await collection.find({$or: [ {"user1.userId": userId}, {"user2.userId": userId}]}).toArray();
        console.log(friendships ,'friendship service')
        return friendships
    } catch (err) {
        console.log(`ERROR: cannot query friendship`)
        throw err;
    }
}


async function save(friendship) {
    delete friendship._id
    let criteria = {
        $or: [
            {$and: [{"user1.userId": friendship.user1.userId}, {"user2.userId": friendship.user2.userId}]},
            {$and: [{"user1.userId": friendship.user2.userId}, {"user2.userId": friendship.user1.userId}]}
        ]
    }
    const collection = await dbService.getCollection('friendship')
    try {
        await collection.replaceOne(criteria, friendship, {upsert: true});
        return friendship;
    } catch (err) {
        console.log(`ERROR: cannot insert friendship`)
        throw err;
    }
}









