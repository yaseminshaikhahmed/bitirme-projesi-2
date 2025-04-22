const User = require('../models/User')


module.exports.profile_get = (req, res)=>{
    res.render('../public/views/profile')
}

module.exports.profile_put = async (req, res)=>{
    console.log(req.body)
    res.status(200).send("OK")
}

module.exports.signup_post = async (req, res)=>{
    const {name,email, password} = req.body

    try{
        const user = await User.create({name,email, password, picture:'',bio:''})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000} )
        res.status(201).json({user:user._id})

    }catch(err){
       const errors = handleErrors(err)
        res.status(400).json({errors})

    }
}