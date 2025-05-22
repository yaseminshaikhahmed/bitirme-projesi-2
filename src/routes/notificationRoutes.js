const { Router } = require('express')
const {notController} = require('../controllers/notificationController')

const router = Router()

router.post('/notification', notController.post_not)


module.exports = router