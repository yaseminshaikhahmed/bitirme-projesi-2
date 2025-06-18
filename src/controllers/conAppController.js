const Notification = require('../models/notification')
const Counselor = require('../models/Counselor')
const Session = require('../models/Session')

function getNot(index){
    const list =[
        "Mesaj gönderdi",
        "randuvunu onayladı",
        "randuvunu reddetti"
    ]
    return list[index]

}

module.exports.send_not = async(req, res)=>{
    //console.log("hello")
    const counselor = req.counselor._id
    const {content, date, time} = req.body
    const appId = req.query.app 
    try{
        const app = await Session.findById(appId)
        
        const user = app.user
        //console.log(user)
        
        const not = await Notification.create({content, date, time, user, counselor})
        if(not){
            console.log("Notification was created")
            res.status(200).send({message:"Notification was created"})
        }else{
            console.log("Notification was not created")
            res.status(405).send({message:"Notification was not created"})
        }

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
            { $set: { declined: true } }
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
        res.status(200).send({message:"Randevu Onaylandı"})
        


    }catch(err){
        console.log(err.message)
        res.status(400).send({message:err.message})
    }

}

// it should modify the session's cancelled propery  to true and then send a notification
// to the user to notify them it was cancelled
module.exports.request_cancel = async(req, res)=>{
       const app = req.query.app 
    try{
        const cancelled = await Session.findByIdAndUpdate(app,
            {cancelled:true}
        )
        if(cancelled){
            res.status(200).send({message:"Session was cancelled"})
        }
        else{
            res.status(405).send({message:"Session was not cancelled"})
        }
        
        


    }catch(err){
        console.log(err.message)
        res.status(400).send({message:err.message})
    }

}