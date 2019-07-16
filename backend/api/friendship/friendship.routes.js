const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {add, query} = require('./friendship.controller.js')

const router = express.Router()



router.get('/', requireAuth, query)
router.post('/', requireAuth, add)

module.exports = router  