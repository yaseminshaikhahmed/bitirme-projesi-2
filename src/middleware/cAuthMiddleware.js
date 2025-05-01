const jwt = require('jsonwebtoken')
require('dotenv').config(); //to access secret key form .env
const Counselor = require('../models/Counselor')

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt
    //check json web token exists & is verified
    if(token){
        jwt.verify(token, process.env.C_JWT_SECRET,(err, decodedToken)=>{
           if(err){
            console.log(err.message)
            res.redirect('/counselor-login')
           } else{
            console.log(decodedToken) //decodedToken is the token after it's been decoded
            next()
           }
        })
    }else{
        res.redirect('/counselor-login')
    }
}

//check current counselor
const checkCounselor = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        decodedToken = jwt.verify(token, process.env.C_JWT_SECRET, async (err, decodedToken)=>{
            if(err){
             console.log(err.message)
             res.locals.counselor = null 
             next()
            } else{
             console.log("decodedToken = ",decodedToken)
             let counselor = await Counselor.findById(decodedToken.id)
             res.locals.counselor = counselor
             next()
            }
         })
         req.counselor = decodedToken  
    }else{
        res.locals.counselor = null
        next()
    }
}


const getCounselor = async (req, res, next) => {
    const token = req.cookies.jwt

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.C_JWT_SECRET);
      const counselor = await Counselor.findById(decodedToken.id);
      req.counselor = counselor;
      next();
    } catch (err) {
      console.log(err);
      req.counselor = null;
      res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }
  } else {
    req.counselor = null;
    res.status(401).json({ error: 'Unauthorized. No token.' });
  }
};

module.exports = checkCounselor;


module.exports = { requireAuth, checkCounselor, getCounselor }