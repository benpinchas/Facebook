const FriendshipService = require('./friendship.service.js')

module.exports = {
    add,
    query
}

async function query(req, res) {
    const userId = req.session.user._id
    try {
        let friendships = await FriendshipService.query(userId)
        res.json(friendships)
    }catch(err) {
        console.log('ERROR in friendship controller query', err)
    }
}

async function add(req, res) {
    const friendship =  req.body
    try {
        let addedFriendship = await FriendshipService.add(friendship)
        res.json(addedFriendship)
    }catch(err) {
        console.log('ERROR: ', err)
    }
}










