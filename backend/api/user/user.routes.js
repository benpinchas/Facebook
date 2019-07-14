const express = require('express')
const {query} = require('./user.controller')

const router = express.Router()

router.get('/', query)
module.exports = router  