const { Router } = require('express')
const appController = require('../controllers/appController')

const router = Router()

//Users
//Display all counselors 
router.get('/counselors', appController.counselors_get)



//Counselors

module.exports = router