const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


module.exports = {
    save,
    query,
    toggleLike,
    saveComment
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


async function save(post) {
    const collection = await dbService.getCollection('post')
    try {
        await collection.insertOne(post);
        return post;
    } catch (err) {
        console.log(`ERROR: cannot insert post`)
        throw err;
    }
}


async function toggleLike({userId, postId}) {
    const collection = await dbService.getCollection('post')
    try {
        let post = await collection.findOne({_id:ObjectId(postId)})
        if (post) {
            let idx = post.likedBy.findIndex(user => user.userId === userId)
            if (idx === -1) {
                post.likedBy.push({userId})
                //create notification
            } else {
                post.likedBy.splice(idx, 1)
            }
            await collection.replaceOne({"_id":ObjectId(post._id)}, {$set : post})
            // console.log(post)
        }
        return {};
    } catch (err) {
        console.log(`ERROR: cannot insert post`)
        throw err;
    }
}

 
async function saveComment(comment, postId) {
    // console.log(postId, comment)
    const collection = await dbService.getCollection('post')
    console.log(postId)
    try {
        let post = await collection.findOne({_id:ObjectId(postId)})
        if (post) {
            post.comments.push(comment)
            await collection.replaceOne({"_id":ObjectId(post._id)}, {$set : post})
            console.log(post.comments, 'COMMENTS SERVICE')
            return post
        }
    }catch(err) {
        console.log('ERROR: ', err)
    }
}









