const Counselor = require('../models/Counselor')
const Session = require('../models/Session')

module.exports.counselors_get = async(req, res)=>{
    try{
        const allCounselors = await Counselor.find()
        res.render('../public/views/counselor-page',{
            allCounselors: allCounselors
        })
        
    }catch(err){
        console.log(err.message)
        res.status(500).render('../public/views/profile', { 
            error: 'Error loading counselors' 
        })
    }
}

module.exports.counselor_get = async(req, res)=>{
    try{
        const counselorId = req.params.id 
        const counselor = await Counselor.findById(counselorId)
        console.log("counselorId = " + counselorId)
        res.render('../public/views/counselor',{
            counselor:counselor
        })

    }catch(err){
        console.log(err.message)
        

    }
}

module.exports.appointment_get = async(req,res)=>{
    try{
        const counselorId = req.params.id
        const counselor = await Counselor.findById(counselorId)
        const appointments = await Session.find({counselor:counselorId})
        console.log("appController.js " + appointments)
        res.render('../public/views/book-appointment',{
            counselor:counselor,
            appointments:appointments
        })
    }catch(err){
        console.log(err.message)
    }
}