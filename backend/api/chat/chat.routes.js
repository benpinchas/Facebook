const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {loadChat} = require('./chat.controller.js')

const router = express.Router()



router.get('/', loadChat)

module.exports = router  