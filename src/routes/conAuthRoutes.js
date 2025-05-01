const { Router } = require('express')
const authController = require('../controllers/conAuthController')

const router = Router()

const upload = require('../middleware/upload')
// router.get('/signup', authController.signup_get)
router.post('/counselor-signup',upload.single('picture'), authController.signup_post)
router.get('/counselor-login',  authController.login_get)
router.post('/counselor-login', authController.login_post)
router.get('/logout', authController.logout_get)

module.exports = router