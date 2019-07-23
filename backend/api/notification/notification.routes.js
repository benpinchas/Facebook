const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {query, setAllSeen} = require ('./notification.controller.js')

const router = express.Router()

router.get('/', requireAuth,query)

router.put('/seen', requireAuth, setAllSeen)

module.exports = router  