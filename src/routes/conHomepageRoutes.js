const { Router } = require('express')
const homepageController = require('../controllers/conHomepageController')
const { requireAuth, checkCounselor, getCounselor } = require('../middleware/cAuthMiddleware');

const router = Router()
router.get('/counselor-homepage', checkCounselor ,requireAuth,getCounselor, homepageController.homepage_get)
router.get('/session', checkCounselor ,requireAuth, homepageController.sess_get)

//get feedback page
router.get('/feedback', checkCounselor ,requireAuth, getCounselor, homepageController.feed_get)
//Get available dates and requests 
router.post('/counselor-homepage',checkCounselor, requireAuth, getCounselor, homepageController.avail_post)

router.delete('/counselor-homepage',checkCounselor, requireAuth, homepageController.homepage_delete)

module.exports = router