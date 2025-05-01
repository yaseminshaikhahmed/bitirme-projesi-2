const { Router } = require('express')
const homepageController = require('../controllers/conHomepageController')
const { requireAuth, checkCounselor, getCounselor } = require('../middleware/cAuthMiddleware');

const router = Router()
router.get('/counselor-homepage', checkCounselor ,requireAuth, homepageController.homepage_get)


module.exports = router