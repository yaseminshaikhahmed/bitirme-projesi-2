const Counselor = require('../models/Counselor')
const Session = require('../models/Session')
const Comment = require('../models/comment')
const mongoose = require('mongoose')

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
        const comments = await Comment.find({
                    counselor: counselorId// Changed from string 'true' to boolean
                }).populate({
                    path: 'user',
                    select: 'name picture',
                }).lean();
        //console.log("counselorId = " + counselorId)
        res.render('../public/views/counselor',{
            counselor:counselor,
            comments:comments
        })

    }catch(err){
        console.log(err.message)
        

    }
}

module.exports.appointment_get = async (req, res) => {
  try {
    let counselorId = req.params.id;
    let appId = req.query.app_id;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(counselorId)) {
      return res.status(400).send('Invalid counselor ID');
    }

    if (!mongoose.Types.ObjectId.isValid(appId)) {
        console.log("no query id yet")
      
    }

    // Fetch documents
    const counselor = await Counselor.findById(counselorId);
    if (!counselor) {
      return res.status(404).send('Counselor not found');
    }

    const appointments = await Session.find({ counselor: counselorId });
    const appointment = await Session.findById(appId);
    if (!appointment) {
      console.log('Appointment not found');
    }

    if (req.headers.accept === 'application/json') {
  res.json({
    
    appointment: appointment
  });
} else {
  res.render('../public/views/book-appointment', {
    counselor: counselor,
    appointments: appointments,
    appointment: appointment
  });
}

    // res.json(appointment);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports.appointment_send = async (req, res)=>{
  try{
    const user = req.user._id
    const sessionId = req.query.app_id
    console.log("hello")
    //const {message} = req.body
    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      {user, taken:true}
      
      )
      if(updatedSession){
        console.log("Session updated")
        res.status(200).send("message : Session updated")
      }else{
        console.log(updatedSession)
        res.status(400).send("Session not updated", updatedSession)
        
      }
  }catch(err){
    console.log(err)
  }
}

module.exports.get_pay = async(req, res) =>{
  try{
    const sessionId = req.params.s_id
    
    const SessionInfo = await Session.findById(sessionId)
    //console.log(SessionInfo.counselor)
    const counselor = await Counselor.findById(SessionInfo.counselor)
    res.render('../public/views/paying',
      {
        info:SessionInfo,
        counselor:counselor
      }
    )
  }catch(err){
    console.log(err.message)
  }

}

module.exports.appointment_booked = async (req, res) =>{
  try{
    res.render('../public/views/after-paying')
  }
  catch(err){
    console.log(err.message)
  }
}

module.exports.get_apps = async (req, res)=>{
  try{
    const user = req.user._id
    const apps = await Session.find({
      user:user
    }).populate({
            path: 'counselor',
            select: 'name' // Specify fields you want to populate (optional but recommended)
        })
    res.render('../public/views/appointments',
      {
        apps:apps
      }
    )
  }
  catch(err){
    console.log(err.message)
  }
}

//go to appointment page (video call)
module.exports.get_app = async (req, res)=>{
  try{
    const id = req.params.id
    const session = await Session.findById(id)
    res.render('../public/views/video-call')
  }
  catch(err){
    console.log(err.message)
  }
}
module.exports.get_app_after = async (req, res)=>{
  try{
    
    res.render('../public/views/after-paying')
  }
  catch(err){
    console.log(err.message)
  }
}
//change completed to true 
module.exports.patch_app = async (req, res)=>{
  try{
    const app = req.params.id
    const completed = await Session.findByIdAndUpdate(app,{
      completed:true
    })
   
  }
  catch(err){
    console.log(err.message)
  }
}

module.exports.get_feedback = async(req, res)=>{
    try{
      const id = req.params.id
      const session = await Session.findById(id)
      res.render('../public/views/feedback',{
        session:session
      })
   
  }
  catch(err){
    console.log(err.message)
  }
}