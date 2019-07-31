const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {save, query, toggleLike, saveComment, getById, saveReact, removeReact} = require('./post.controller')

const router = express.Router()


router.get('/', query)
router.get('/:postId', getById)
router.post('/', requireAuth, save)
router.post('/like', toggleLike)
router.post('/react', saveReact)
router.delete('/react', removeReact)
router.post('/comment', saveComment)



module.exports = router  