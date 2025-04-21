//const path = require('path');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config(); //to access secret key form .env

//Handle errors
const handleErrors = (err)=>{
    console.log(err.message, err.code)
    let errors = {
        name: '',
        email: '',
        password:'' 
    }

    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered'
    }

    //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'that password is not registered'
    }


    //Duplicate error code
    if(err.code === 11000){
        errors.email = 'that email is already registered'
        return errors
    }
    //Validation errors
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message
        })
    }
    return errors
}

//Create a jwt token
const maxAge = 3 * 24 * 60 * 60 //three days
const createToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    }) // the second parameter is the secret
}


module.exports.signup_get = (req, res)=>{
    res.render('../public/views/sign-up')
}

module.exports.login_get = (req, res)=>{
    res.render('../public/views/login')
}

module.exports.signup_post = async (req, res)=>{
    const {name,email, password} = req.body

    try{
        const user = await User.create({name,email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000} )
        res.status(201).json({user:user._id})

    }catch(err){
       const errors = handleErrors(err)
        res.status(400).json({errors})

    }
}

module.exports.login_post = async (req, res)=>{
    const {email, password} = req.body
    
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000} )
        res.status(200).json({user: user._id})

    }catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.logout_get =(req, res)=>{
    res.cookie('jwt', '', {maxAge:1})//removing the token value and giving a very short expiring date
    res.redirect('/signup')
}