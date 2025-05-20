const { Router } = require('express')
const appController = require('../controllers/conAppController')
const { requireAuth, checkCounselor, getCounselor } = require('../middleware/cAuthMiddleware');

const router = Router()

//decline a request, send a notification to the user that the counselor has declined their request, use query 

router.post('/counselor-homepage/decline', checkCounselor ,requireAuth,getCounselor, appController.request_decline)

//accept a request, change the appointment accepted property to 'true', then go to homepage get and display them
//router.patch('/counselor-homepage/accept',checkCounselor, requireAuth, appController.request_accept)



module.exports = router