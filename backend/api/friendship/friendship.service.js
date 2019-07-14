const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    add,
}

async function add(friendship) {
    const collection = await dbService.getCollection('friendship')
    try {
        await collection.insertOne(friendship);
        return friendship;
    } catch (err) {
        console.log(`ERROR: cannot insert friendship`)
        throw err;
    }
}









