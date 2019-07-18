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
        // let criteria = {}
        // criteria.userId = new ObjectId('5d2ae89cccd9bb8b258c7a99')
        let posts = await collection.aggregate([
            {
                $match: {}
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            }
        ]).toArray()
        console.log("POSTS", posts)
        return posts
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
        let post = await collection.findOne({ _id: ObjectId(postId) })
        if (post) {
            let idx = post.likedBy.findIndex(like => like.userId === user._id)
            if (idx === -1) {
                post.likedBy.unshift({ userId: user._id, username: user.username })

                let notification = {
                    at: Date.now(),
                    userId: post.userId,
                    postId,
                    type: 'post-like',
                    isSeen: false,
                    isRead: false,
                    txt: (post.likedBy.length > 1) ? ` <span class="strong"> ${post.likedBy[0].username} </span> and <span class="strong"> ${post.likedBy.length - 1} </span> other people Liked your post recently` : `<span class="strong">  ${post.likedBy[0].username} </span> Liked your post`,
                    imgUrl: user.url.profileImg
                }
                await NotificationService.save(notification)
            } else {
                post.likedBy.splice(idx, 1)
            }
            await collection.replaceOne({ "_id": ObjectId(post._id) }, { $set: post })
        }
        return {};
    } catch (err) {
        console.log(`ERROR: cannot insert post`)
        throw err;
    }
}

//comment, postId 
async function saveComment(postId, txt, user) {
    const collection = await dbService.getCollection('post')
    try {
        let post = await collection.findOne({ _id: ObjectId(postId) })
        if (post) {

            let comment = {
                postId,
                txt,
                owner: { userId: user._id, username: user.username, profileImg: user.url.profileImg }, //TODO _makeOwner
                likedBy: []
            }
            post.comments.push(comment)
            await collection.replaceOne({ "_id": ObjectId(post._id) }, { $set: post })

            var result = [];
            post.comments.forEach(comment => {
                if (result.indexOf(comment.owner.userId) < 0) {
                    result.push(comment.owner.userId);
                }
            });

            let userCount = result.length

            let notification = {
                at: Date.now(),
                userId: post.userId,
                postId,
                type: 'post-comment',
                isSeen: false,
                isRead: false,
                txt: (userCount > 1) ? ` <span class="strong"> ${post.comments[0].owner.username} </span> and <span class="strong"> ${userCount - 1} </span> others commeneted on your post` : `<span class="strong"> ${post.comments[0].owner.username} </span> commented on your post`,
                imgUrl: user.url.profileImg
            }
            await NotificationService.save(notification)

            return post
        }
    } catch (err) {
        console.log('ERROR: ', err)
    }
}









