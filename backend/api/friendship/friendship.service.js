const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const SocketService = require('../../services/socket.service')

module.exports = {
    query,
    save,
}


async function query(userId) {
    console.log(userId)
    // const criteria = {};
    // if (filterBy.user2Id) {
    //     criteria["user2.userId"] = filterBy.user2Id   
    // }
    // if (filterBy.isApproved) {
    //     criteria.isApproved = (filterBy.isAprroved === "true")? true : false;
    // }

    const collection = await dbService.getCollection('friendship')
    try {
//$or: [ {"user1Id": ObjectId(userId)}, {"user2Id": ObjectId(userId)}]
        let friendships = await collection.aggregate([
            {
                $match: 
                    {$or: [ {"user1Id": ObjectId(userId)}, {"user2Id": ObjectId(userId)}]}

            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'user1Id',
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
                    localField: 'user2Id',
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
    delete friendship.user1
    delete friendship.user2
    friendship.user1Id = ObjectId(friendship.user1Id)
    friendship.user2Id = ObjectId(friendship.user2Id)
    let criteria = {
        $or: [
            {$and: [{"user1Id": friendship.user1Id}, {"user2Id": friendship.user2Id}]},
            {$and: [{"user1Id": friendship.user2Id}, {"user2Id": friendship.user1Id}]}
        ]
    }
    const collection = await dbService.getCollection('friendship')
    try {
        await collection.replaceOne(criteria, friendship, {upsert: true});
        SocketService.emit(friendship.user2Id.toString(), 'new friendship')
        return friendship;
    } catch (err) {
        console.log(`ERROR: cannot insert friendship`)
        throw err;
    }
}









