const { Router } = require('express')

const router = Router()

const messageController = require('../controllers/messageController')
const { requireAuth, checkUser, getUser } = require('../middleware/authMiddleware')

router.get('/messages', requireAuth, checkUser, messageController.get_message)

module.exports = router