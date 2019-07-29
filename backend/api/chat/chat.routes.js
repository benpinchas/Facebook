const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {loadChat, getInboxMsgs} = require('./chat.controller.js')

const router = express.Router()



router.get('/', loadChat)
router.get('/inbox', getInboxMsgs)

module.exports = router  