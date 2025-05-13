const Counselor = require('../models/Counselor')
const Session = require('../models/Session')
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
        console.log("counselorId = " + counselorId)
        res.render('../public/views/counselor',{
            counselor:counselor
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
