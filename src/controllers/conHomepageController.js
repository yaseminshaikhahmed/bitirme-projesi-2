const Session = require('../models/Session')
const User = require('../models/User')


module.exports.homepage_get =async (req, res)=>{
    try{
        const counselorId = req.counselor._id
        const availApps = await avail_get(req,res)
        const requestedApps = await requested_get(req,res)
        //let users = []
        const acceptedSessions = await getAccepted(counselorId)
        
        // for(let i = 0 ; i < requestedApps.length ; ++i){
        //     //console.log(requestedApps[i].user)
        //     users[i] = await (getUser(requestedApps[i].user))
            
        // }
        
        //const user = await User.findById(requestedApps)
        console.log(acceptedSessions)
        res.render('../public/views/counselor-homepage',{
            availApps:availApps,
            requestedApps:requestedApps,
            //users:users,
            acceptedSessions:acceptedSessions
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
async function requested_get(req, res){
    try{
        const counselorId = req.counselor._id
        //console.log("counselorId: "+counselorId)
        const requestedApps = await Session.find({counselor:counselorId,
            user: { $ne: null }
        })
        
        //console.log("Available appointments:"+availApps)
        return requestedApps
    }catch(err){
        console.log(err.message)
        res.status(500).json({message:"Can't get requested dates " + err.message})
    }
}

async function getUser(userId){
    try{
        
        const user = await User.findById(userId)
        //console.log(user)
        
        //console.log("Available appointments:"+availApps)
        return user
    }catch(err){
        console.log(err.message)
        
    }
    
}

async function getAccepted(counselorId) {
    try {
        const acceptedSessions = await Session.find({
            counselor: counselorId,
            accepted: true // Changed from string 'true' to boolean
        }).populate({
            path: 'user',
            select: 'name' // Specify fields you want to populate (optional but recommended)
        }).lean(); // Adding .lean() for better performance if you don't need Mongoose documents

        if (!acceptedSessions || acceptedSessions.length === 0) {
            return []; // Return empty array if no sessions found
        }

        return acceptedSessions;
    } catch (err) {
        console.error('Error in getAcceptedSessions:', err.message);
        throw err; // Re-throw the error to handle it in the calling function
        // OR return null/[] if you prefer to handle it silently
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


module.exports.sess_get = async (req, res)=>{
    try{
        //const id = req.params.id
        res.render('../public/views/con-video-call')

        
    }catch(err){
        console.log(err.message)
    }
}