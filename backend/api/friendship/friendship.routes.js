const express = require('express')
const {add, query} = require('./friendship.controller.js')

const router = express.Router()



router.get('/', query)
router.post('/', add)

module.exports = router  