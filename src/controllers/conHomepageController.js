const Session = require('../models/Session')


module.exports.homepage_get =async (req, res)=>{
    try{
        const availApps = await avail_get(req,res)
        //console.log(availApps)
        res.render('../public/views/counselor-homepage',{
            availApps:availApps
        })
        
    }catch(err){
        console.log(err.message)
        res.status(500).json({message:err.message})
    }
}

async function avail_get(req, res){
    try{
        const counselorId = req.counselor._id
        //console.log("counselorId: "+counselorId)
        const availApps = await Session.find({counselor:counselorId})
        //console.log("Available appointments:"+availApps)
        return availApps
    }catch(err){
        console.log(err.message)
        res.status(500).json({message:"Can't get availabe dates"})
    }
}
//Delete available dates 
module.exports.homepage_delete = async(req, res)=>{
    try{
        const deletedApp = await Session.deleteOne(Session._id)
        res.status(203).JSON({message:"date was deleted"})

    }catch(err){
        console.log(err.message)
        res.status(500).JSON({message:err.message})
    }
}

module.exports.avail_post = async (req, res)=>{
   
    try{
        const {date, time, price, duration} = req.body//err
        const counselor = req.counselor._id//err
        console.log("counselor id : " + counselor)
        
        
        
        const session = await Session.create({counselor, date, time, price, duration})
        if(session){
            console.log("session created successfully")
            res.status(202).json({message:"session created successfully"}, session)
        }
    }catch(err){
        res.status(400).json({message:"Error creating new availabe date", error:err.message})
        console.log(err.message)
    }
}
