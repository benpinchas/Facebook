const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {query, getById} = require('./user.controller')

const router = express.Router()

router.get('/', query)
router.get('/:userId', requireAuth ,getById)

module.exports = router  