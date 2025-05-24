const { Router } = require('express')
const appController = require('../controllers/conAppController')
const { requireAuth, checkCounselor, getCounselor } = require('../middleware/cAuthMiddleware');

const router = Router()

//decline a request, send a notification to the user that the counselor has declined their request, use query 

router.post('/counselor-homepage/send', checkCounselor ,requireAuth,getCounselor, appController.send_not)
router.patch('/counselor-homepage/decline', checkCounselor ,requireAuth, appController.remove_user)

//accept a request, change the appointment accepted property to 'true', then go to homepage get and display them
router.patch('/counselor-homepage/accept',checkCounselor, requireAuth, appController.request_accept)
//the counselor will cancel a session - delete the whole session - send a notification
//  to the user that the session was cancelled
router.patch('/counselor-homepage/cancel',checkCounselor, requireAuth, appController.request_cancel)



module.exports = router