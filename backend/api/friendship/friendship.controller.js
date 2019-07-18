const FriendshipService = require('./friendship.service.js')

module.exports = {
    save,
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

async function save(req, res) {
    const friendship =  req.body
    console.log('COMTROLLER friendship', friendship)
    try {
        let savedFriendship = await FriendshipService.save(friendship)
        res.json(savedFriendship)
    }catch(err) {
        console.log('ERROR: ', err)
    }
}










