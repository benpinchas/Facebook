const postService = require('./post.service')
const userService = require('../user/user.service.js')


async function query(req, res) {
    // const filterBy = req.body GET request
    try {
        const posts = await postService.query()
        res.json(posts)
    } catch (err) {
        res.status(401).send({ error: err })
    }

}

async function save(req, res) {
    const post = req.body
    try {
        const savedPost = await postService.save(post)
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
    const {txt, postId} = req.body
    const user = req.session.user
    // comment.owner = userService.makeOwner(req.session.user)
    try {
       let savedComment =  await postService.saveComment(postId, txt, user)
       res.json(savedComment)
    }catch(err) {
        console.log(err)
    }
}


module.exports = {
    save,
    query,
    toggleLike,
    saveComment
}