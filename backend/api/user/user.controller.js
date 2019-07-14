let UserService = require('./user.service.js')

module.exports = {
    query,
}

async function query(req, res) {
    try {
        let users = await UserService.query()
        res.json(users)
    }catch(err) {
        console.log('ERROR: ',err);
    }
}