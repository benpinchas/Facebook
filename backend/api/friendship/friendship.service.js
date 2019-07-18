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

        let friendships = await collection.aggregate([
            {
                $match: 
                    {$or: [ {"user1": ObjectId(userId)}, {"user2": ObjectId(userId)}]}

            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'user1',
                    foreignField: '_id',
                    as: 'user1'
                }
            },
            {
                $unwind: '$user1'
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'user2',
                    foreignField: '_id',
                    as: 'user2'
                }
            },
            {
                $unwind: '$user2'
            }
        ]).toArray()
        return friendships


        // let friendships = await collection.find({$or: [ {"user1": ObjectId(userId)}, {"user2": ObjectId(userId)}]}).toArray();
        // console.log(friendships ,'friendship service')
        // return friendships
    } catch (err) {
        console.log(`ERROR: cannot query friendship`)
        throw err;
    }
}


async function save(friendship) {
    delete friendship._id
    friendship.user1 = ObjectId(friendship.user1)
    friendship.user2 = ObjectId(friendship.user2)
    let criteria = {
        $or: [
            {$and: [{"user1": friendship.user1}, {"user2": friendship.user2}]},
            {$and: [{"user1": friendship.user2}, {"user2": friendship.user1}]}
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









