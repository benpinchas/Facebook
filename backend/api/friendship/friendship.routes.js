const express = require('express')
const {add, getRequests} = require('./friendship.controller.js')

const router = express.Router()


router.post('/', add)
// router.get('/:userId/requests', getRxequests)
module.exports = router  