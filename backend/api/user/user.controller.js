let UserService = require('./user.service.js')

module.exports = {
    query,
    getById,
    update
}

async function query(req, res) {
    try {
        let users = await UserService.query()
        res.json(users)
    }catch(err) {
        console.log('ERROR: ',err);
        res.status(500)
    }
}


async function getById(req, res) {
    const {userId} = req.params
    try {
        let user = await UserService.getById(userId)
        delete user.password
        res.json(user)
    }catch(err) {
        console.log('ERROR: ', err)
        res.status(500)
    }
}

async function update(req, res) {
    let user = req.body
    if (user._id !== req.session.user._id) res.status(401)
    try {
        let savedUser = await UserService.update(user)
        delete savedUser.password
        res.json(savedUser)
    }catch(err) {
        console.log('ERROR: ', err)
        res.status(500)
    }
}