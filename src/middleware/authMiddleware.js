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
        decodedToken = jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken)=>{
            if(err){
             console.log(err.message)
             res.locals.user = null 
             next()
            } else{
             console.log("decodedToken = ",decodedToken)
             let user = await User.findById(decodedToken.id)
             res.locals.user = user
             next()
            }
         })
         req.user = decodedToken  
    }else{
        res.locals.user = null
        next()
    }
}


const getUser = async (req, res, next) => {
    const token = req.cookies.jwt

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken.id); // ✅ await here
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      req.user = null;
      res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }
  } else {
    req.user = null;
    res.status(401).json({ error: 'Unauthorized. No token.' });
  }
};

module.exports = checkUser;


module.exports = { requireAuth, checkUser, getUser }