const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


module.exports = {
    add,
    query
}


async function query() {
    const collection = await dbService.getCollection('post')
    try {
        let posts = await collection.find({}).toArray()
        return posts;
    } catch (err) {
        console.log(`ERROR: cannot insert post`)
        throw err;
    }
}

async function add(post) {
    const collection = await dbService.getCollection('post')
    try {
        await collection.insertOne(post);
        return post;
    } catch (err) {
        console.log(`ERROR: cannot insert post`)
        throw err;
    }
}


