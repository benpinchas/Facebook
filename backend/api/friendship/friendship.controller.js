const FriendshipService = require('./friendship.service.js')

module.exports = {
    add,
    getRequests
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

async function getRequests(req, res) {
    const {userId} = req.params
    console.log(userId)
    res.json({})
}








