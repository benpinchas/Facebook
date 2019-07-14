const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {save, query, toggleLike, saveComment} = require('./post.controller')

const router = express.Router()


router.get('/', query)
router.post('/', requireAuth, save)
router.post('/like', toggleLike)
router.post('/comment', saveComment)



module.exports = router  