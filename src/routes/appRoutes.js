const { Router } = require('express')
const appController = require('../controllers/appController')
const { requireAuth, checkUser, getUser } = require('../middleware/authMiddleware')

const router = Router()

//Users
//Display all counselors 
router.get('/feedback/:id',requireAuth, checkUser, appController.get_feedback)
router.get('/counselors',requireAuth, checkUser, appController.counselors_get)
router.get('/appointments',requireAuth, checkUser, getUser, appController.get_apps)
router.get('/appointments/:id',requireAuth, checkUser, appController.get_app)
router.patch('/appointments/:id',requireAuth, checkUser, appController.patch_app)
router.get('/appointments/p/:id',requireAuth, checkUser, appController.get_app_after)
//display a specific counselor
router.get('/:id',requireAuth, checkUser, appController.counselor_get)
router.get('/:id/book',requireAuth, checkUser, appController.appointment_get)
//let the user send a request to the counselor
router.patch('/:id/book',requireAuth, checkUser, getUser, appController.appointment_send)

//paying page
router.get('/:s_id/pay',requireAuth, checkUser, appController.get_pay)

router.get('/appointments/:s_id',requireAuth, checkUser, appController.appointment_booked)




//Counselors

module.exports = router