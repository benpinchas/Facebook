const FriendshipService = require('./friendship.service.js')

module.exports = {
    add,
    query
}

async function query(req, res) {
    let filterBy = req.query 
    console.log(filterBy,  'controller')
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










