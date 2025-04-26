const { Router } = require('express')
const profileController = require('../controllers/profileController')
const { requireAuth, checkUser, getUser } = require('../middleware/authMiddleware');
const router = Router()

router.get('/profile', checkUser, requireAuth, profileController.profile_get);
//router.put('/profile', requireAuth, checkUser, profileController.profile_put);
router.put('/profile',getUser, requireAuth, profileController.profile_put);

module.exports = router