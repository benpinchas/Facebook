const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

const NotificationService = require('../notification/notification.service.js')

module.exports = {
    save,
    query,
    toggleLike,
    saveComment,
    getById,
    saveReact,
    removeReact
}


async function query(filterBy = {}) {
    let criteria = {}
    if (filterBy.user2Id) {
        criteria.user2Id = ObjectId(filterBy.user2Id)
    }
    console.log('criteria', criteria)
    const collection = await dbService.getCollection('post')
    let posts = await collection.aggregate([
        {
            $match: criteria
        },
        { $sort: { at: -1 } },
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
    // console.log("POSTS", posts)
    return posts
}


async function getById(postId) {
    const collection = await dbService.getCollection('post')
    try {
        let posts = await collection.aggregate([
            {
                $match: { "_id": ObjectId(postId) }
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
        console.log(' posts[0]', posts[0])
        return posts[0]
    } catch (err) {
        console.log(`ERROR: cannot insert post`)
        throw err;
    }
}


async function save(post, loggedInUser) {
    const collection = await dbService.getCollection('post')
    try {
        await collection.insertOne(post);
        if (!post.userId.equals(post.user2Id)) {
            let notification = {
                at: Date.now(),
                userId: post.user2Id,
                postId: post._id,
                type: 'post-wall',
                isSeen: false,
                isRead: false,
                txt: `<span class="strong"> ${loggedInUser.username} </span> posted on your wall`,
                imgUrl: loggedInUser.url.profileImg
            }
            await NotificationService.save(notification)
        }

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

async function saveReact(postId, react,  user) {
    const collection = await dbService.getCollection('post')
    try {
        let post = await collection.findOne({ "_id": ObjectId(postId) })
        console.log(post)
        let reactIdx = post.reactions.findIndex(currReact => currReact.userId === react.userId)
        if (reactIdx === -1) {
            post.reactions.unshift(react)
            let notification = {
                at: Date.now(),
                userId: post.userId,
                postId: post._id,
                type: 'post-like',
                isSeen: false,
                isRead: false,
                txt: (post.reactions.length > 1) ? ` <span class="strong">  ${user.username} </span>  and <span class="strong"> ${post.reactions.length - 1} </span> other people reacted your post recently` : `<span class="strong">  ${user.username} </span> react to your post`,
                imgUrl: user.url.profileImg
            }
            await NotificationService.save(notification)
        } else {
            post.reactions.splice(reactIdx, 1, react)
        }
        console.log(post)
        await collection.replaceOne({ "_id": ObjectId(post._id) }, { $set: post })
    } catch (err) {
        throw err
    }

    async function _sendNotification(post, user) {
       
    }
}

async function removeReact(postId, loggedInUserId) {
    console.log(loggedInUserId)
    const collection = await dbService.getCollection('post')
    try {
        let post = await collection.findOne({"_id": ObjectId(postId)})
        let reactIdx = post.reactions.findIndex(currReact => currReact.userId === loggedInUserId)
        console.log('reactIdx', reactIdx)
        if (reactIdx >= 0) post.reactions.splice(reactIdx, 1)

        await collection.replaceOne({ "_id": ObjectId(postId) }, { $set: post })
    }catch(err) {
        throw err
    }
}


async function saveComment(comment) {
    const collection = await dbService.getCollection('post')
    try {

        let post = await collection.findOne({ _id: ObjectId(comment.postId) })
        let commentIdx = post.comments.findIndex(currComment => currComment._id === comment._id)

        if (commentIdx >= 0) {
            post.comments.splice(commentIdx, 1, comment)
        } else {
            post.comments.unshift(comment)

            //Notification
            var commenters = [];
            post.comments.forEach(comment => {
                if (commenters.indexOf(comment.owner.userId) < 0) {
                    commenters.push(comment.owner.userId);
                }
            });

            let userCount = commenters.length //commenterCount

            let notification = {
                at: Date.now(),
                userId: post.userId,
                postId: post._id,
                type: 'post-comment',
                isSeen: false,
                isRead: false,
                txt: (userCount > 1) ? ` <span class="strong"> ${post.comments[0].owner.username} </span> and <span class="strong"> ${userCount - 1} </span> others commeneted on your post` : `<span class="strong"> ${post.comments[0].owner.username} </span> commented on your post`,
                imgUrl: comment.owner.profileImg
            }
            await NotificationService.save(notification)
        }

        await collection.replaceOne({ "_id": ObjectId(post._id) }, { $set: post })
        console.log('comment:', comment)
        return comment
    } catch (err) {
        console.log('ERROR: ', err)
    }
}







