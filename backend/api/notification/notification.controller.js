let NotificationService = require('./notification.service.js')

module.exports ={
    query,
    update
}

async function query(req, res) {
    const userId = req.session.user._id
    try {
        let notifications = await NotificationService.query(userId)
        res.json(notifications)
    }catch(err) {
        console.log('ERROR: notification.controller query :', err)
    }
}

async function update(req, res) {
    const notification = req.body
    try {
        await NotificationService.update(notification)
        res.json({})
    }catch(err) {
        console.log('ERROR: notification.controller update :', err)
    }
}






