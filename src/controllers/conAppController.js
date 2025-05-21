const Notification = require('../models/notification')
const Counselor = require('../models/counselor')
const Session = require('../models/Session')

function getNot(index){
    const list =[
        "Mesaj gönderdi",
        "randuvunu onayladı",
        "randuvunu reddetti"
    ]
    return list[index]

}

module.exports.request_decline = async(req, res)=>{
    console.log("hello")
    const counselorId = req.counselor._id
    const {content, date, time} = req.body
    const appId = req.query.app 
    try{
        const app = await Session.findById(appId)
        console.log(app)
        const user = app.user
        const counselor = app.counselor
        
        const not = await Notification.create({content, date, time, user, counselor})


    }catch(err){
        console.log(err.message)
        res.status(400).send({message:err.message})
    }

    
}

module.exports.remove_user = async(req,res)=>{
    const app = req.query.app
    try{
        const updated = await Session.updateOne(
            { _id: app },
            { $set: { user: null } }
        )
        


    }catch(err){
        console.log(err.message)
        res.status(400).send({message:err.message})
    }

}
module.exports.request_accept = async(req, res)=>{
        const app = req.query.app
    try{
        const updated = await Session.updateOne(
            { _id: app },
            { $set: { accepted: true } }
        )
        


    }catch(err){
        console.log(err.message)
        res.status(400).send({message:err.message})
    }

}