const { Router } = require('express')
const appController = require('../controllers/appController')
const { requireAuth, checkUser, getUser } = require('../middleware/authMiddleware')

const router = Router()

//Users
//Display all counselors 
router.get('/counselors',requireAuth, checkUser, appController.counselors_get)

//display a specific counselor
router.get('/:id',requireAuth, checkUser, appController.counselor_get)
router.get('/:id/book',requireAuth, checkUser, appController.appointment_get)



//Counselors

module.exports = router