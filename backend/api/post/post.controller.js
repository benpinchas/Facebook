const postService = require('./post.service')
const userService = require('../user/user.service.js')
const ObjectId = require('mongodb').ObjectId


async function query(req, res) {
    const filterBy = req.query
    console.log('filterBy, req.query', filterBy, req.query)
    try {
        const posts = await postService.query(filterBy)
        res.json(posts)
    } catch (err) {
        res.status(401).send({ error: err })
    }

}

async function getById(req, res) {
    const {postId} = req.params
    try {
        const post = await postService.getById(postId)
        res.json(post)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function save(req, res) {
    const loggedInUser = req.session.user
    const post = req.body
    post.userId = ObjectId(req.session.user._id)
    post.user2Id = ObjectId(post.user2Id)
    try {
        const savedPost = await postService.save(post, loggedInUser)
        res.json(savedPost)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function toggleLike(req, res) {
    const {postId} = req.body
    const user = req.session.user
    try {
        await postService.toggleLike(postId, user)
        res.json({})
    }catch(err) {
        console.log('ERROR: ', err)
    }
}

async function saveComment(req, res) {
    const comment = req.body
    try {
       let savedComment =  await postService.saveComment(comment)
       console.log('savedComment', savedComment)
       res.json(savedComment)
    }catch(err) {
        console.log(err)
    }
}


async function saveReact(req, res) {
    let {react, postId} = req.body
    let user = req.session.user
    console.log('react, postId', react, postId, user)

    try {   
        await postService.saveReact(postId, react, user)
        res.json({})
    }catch(err) {
        console.log('ERROR: saveReact', err)
    }
}


async function removeReact(req, res) {
    let loggedInUserId = req.session.user._id
    let {postId} = req.body
    console.log(postId, loggedInUserId)
    try {
        await postService.removeReact( postId, loggedInUserId)
    }catch(err) {
        console.log('ERROR postService.removeReact', err)
    }
}

module.exports = {
    save,
    query,
    toggleLike,
    saveComment,
    getById,
    saveReact,
    removeReact
}