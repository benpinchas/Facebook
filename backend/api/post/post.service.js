const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

const NotificationService = require('../notification/notification.service.js')

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


async function toggleLike(postId, user) {
    const collection = await dbService.getCollection('post')
    try {
        let post = await collection.findOne({_id:ObjectId(postId)})
        if (post) {
            let idx = post.likedBy.findIndex(like => like.userId === user._id)
            if (idx === -1) {
                post.likedBy.unshift({userId: user._id, username:user.username})
                
                let notification = {
                    at: Date.now(),
                    userId: post.owner.userId,
                    postId,
                    type: 'post-like',
                    isSeen: false,
                    isRead: false,
                    txt:  (post.likedBy.length > 1)? ` <span class="strong"> ${post.likedBy[0].username} </span> and <span class="strong"> ${post.likedBy.length-1} </span> other people Liked your post recently` : `${post.likedBy[0].username} Liked your post`,
                    imgUrl: user.url.profileImg
                }
                await NotificationService.save(notification)
            } else {
                post.likedBy.splice(idx, 1)
            }
            await collection.replaceOne({"_id":ObjectId(post._id)}, {$set : post})
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









