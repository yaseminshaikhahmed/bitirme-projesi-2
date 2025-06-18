// the counselor

const { Router } = require('express')

const router = Router()

const commentController = require('../controllers/commentController')
const { requireAuth, checkUser, getUser } = require('../middleware/authMiddleware')

router.post('/feedback/:id', requireAuth, checkUser, getUser, commentController.post_feedback)

module.exports = router