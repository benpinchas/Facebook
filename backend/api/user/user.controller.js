let UserService = require('./user.service.js')

module.exports = {
    query,
    getById
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

