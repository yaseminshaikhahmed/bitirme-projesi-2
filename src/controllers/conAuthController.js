//const path = require('path');
const Counselor = require('../models/Counselor')
const jwt = require('jsonwebtoken')
require('dotenv').config(); //to access secret key form .env


//jwt
//Create a jwt token
const maxAge = 3 * 24 * 60 * 60 //three days
const createToken = (id)=>{
    return jwt.sign({ id }, process.env.C_JWT_SECRET, {
        expiresIn: maxAge
    }) // the second parameter is the secret
}

//get requests

//this is not created yet 

// module.exports.signup_get = (req, res)=>{
//     res.render('../public/views/sign-up')
// }

module.exports.login_get = (req, res)=>{
    res.render('../public/views/counselor-login')
}

module.exports.signup_post = async (req, res)=>{
    console.log(req.body)
    console.log(req.file)
    
    const picture = req.file
    const {name, email, password, experience, education, description} = req.body

    try{
        const counselor = await Counselor.create({name, email, password, picture: req.file.filename , experience, education, description})
        const token = createToken(counselor._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000} )
        res.status(201).json({counselor:counselor._id})

    }catch(err){
       
        res.status(400)
        console.log(err.message)

    }
}

module.exports.login_post = async (req, res)=>{
    const {email, password} = req.body
    
    try{
        const counselor = await Counselor.login(email, password)
        const token = createToken(counselor._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000} )
        res.status(200).json({counselor: counselor._id})

    }catch(err){
        console.log(err.message)
        res.status(400)
    }
}

module.exports.logout_get =(req, res)=>{
    res.cookie('jwt', '', {maxAge:1})//removing the token value and giving a very short expiring date
    res.redirect('/counselor-login')
}