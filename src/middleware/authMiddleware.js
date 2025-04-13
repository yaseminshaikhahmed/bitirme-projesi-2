const jwt = require('jsonwebtoken')
require('dotenv').config(); //to access secret key form .env
const User = require('../models/User')

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt
    //check json web token exists & is verified
    if(token){
        jwt.verify(token, process.env.JWT_SECRET,(err, decodedToken)=>{
           if(err){
            console.log(err.message)
            res.redirect('/login')
           } else{
            console.log(decodedToken) //decodedToken is the token after it's been decoded
            next()
           }
        })
    }else{
        res.redirect('/login')
    }
}

//check current user
const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken)=>{
            if(err){
             console.log(err.message)
             res.locals.user = null 
             next()
            } else{
             console.log(decodedToken)
             let user = await User.findById(decodedToken.id)
             res.locals.user = user
             next()
            }
         })
    }else{
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }