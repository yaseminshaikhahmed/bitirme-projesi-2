const { Router } = require('express')
const profileController = require('../controllers/profileController')

const router = Router()

router.get('/profile', profileController.profile_get)
router.put('/profile', profileController.profile_put)

module.exports = router