const postService = require('./post.service')



async function query(req, res) {
    // const filterBy = req.body GET request
    try {
        const posts = await postService.query()
        console.log('controller: ', posts);
        res.json(posts)
    } catch(err) {
        res.status(401).send({ error: err })
    }

}


async function add(req, res) {
    const post  = req.body
    try {        
        const addedPost = await postService.add({...post, userId: req.session.user._id})
        console.log('controller:', addedPost);        
        res.json(addedPost)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}


module.exports = {
    add,
    query
}