const { Router } = require('express')
const profileController = require('../controllers/profileController')
const { requireAuth, checkUser, getUser } = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

const router = Router()

router.get('/profile', checkUser, getUser, requireAuth, profileController.profile_get);
//router.put('/profile', requireAuth, checkUser, profileController.profile_put);
router.put('/profile',getUser, requireAuth, upload.single('picture'), profileController.profile_put);
router.delete('/profile', profileController.profile_delete)

module.exports = router