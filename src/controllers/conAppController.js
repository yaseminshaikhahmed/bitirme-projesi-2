const Notification = require('../models/notification')
const Counselor = require('../models/counselor')
const Session = require('../models/session')

module.exports.request_decline = async(req, res)=>{
    console.log("hello")
    const counselor = req.counselor._id
    const {content, date, time} = req.body
    const appId = req.query.app
    try{
        const app = await Session.findById(appId)
        console.log(app)
        const user = app.user
        const not = await Notification.create({content, date, time, user})


    }catch(err){
        console.log(err.message)
        res.status(400).send({message:err.message})
    }

    
}
// module.exports.request_accept = async(req, res)=>{

// }