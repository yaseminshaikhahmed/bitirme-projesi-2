const { Router } = require('express')
const homepageController = require('../controllers/conHomepageController')
const { requireAuth, checkCounselor, getCounselor } = require('../middleware/cAuthMiddleware');

const router = Router()
router.get('/counselor-homepage', checkCounselor ,requireAuth,getCounselor, homepageController.homepage_get)
//Get available dates
router.post('/counselor-homepage',checkCounselor, requireAuth, getCounselor, homepageController.avail_post)

// router.delete('/counselor-homepage',checkCounselor, requireAuth, homepageController.homepage_delete)

module.exports = router