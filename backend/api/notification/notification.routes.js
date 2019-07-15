const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {query} = require ('./notification.controller.js')

const router = express.Router()

router.get('/', query)


module.exports = router  