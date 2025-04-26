const { Router } = require('express')
const homepageController = require('../controllers/homepageController')
const { requireAuth, checkUser, getUser } = require('../middleware/authMiddleware');

const router = Router()
router.get('/homepage', checkUser,requireAuth, homepageController.homepage_get)
//to post a feeling and save it to the databases
router.post('/homepage', checkUser, getUser, homepageController.homepage_post)

module.exports = router