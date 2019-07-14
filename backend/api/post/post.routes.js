const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {add, query} = require('./post.controller')

const router = express.Router()


router.get('/', query)
router.post('/', requireAuth, add)

module.exports = router  