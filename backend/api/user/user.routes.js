const express = require('express')
const {query, getById} = require('./user.controller')

const router = express.Router()

router.get('/', query)
router.get('/:userId', getById)

module.exports = router  