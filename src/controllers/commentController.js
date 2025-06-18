const Comment = require('../models/comment')
const Session = require('../models/Session')
const Counselor = require('../models/Counselor')


module.exports.post_feedback = async(req,res)=>{
 try{
    const user = req.user._id
    const appId = req.params.id
    console.log(appId)
    const appointment = await Session.findById(appId)
    const counselor = appointment.counselor
    const {rating, time, date, content} = req.body
    console.log(counselor + " " + user)
    const comment = await Comment.create({user, counselor,rating, time, date, content})
    const modifiedRating = await modifyRating(counselor, rating)
    res.status(201).json({ message: "Feedback submitted successfully!" });
  }
  catch(err){
    console.log(err.message)
    res.status(500).json({ message: "Server error" });
  }

}

async function modifyRating(counselorId, rate) {
  try {
    const counselor = await Counselor.findById(counselorId);
    if (!counselor) {
      console.log("Counselor not found");
      return;
    }
    if(counselor.rating == 0){counselor.rating =  rate}
    else{
    counselor.rating = counselor.rating + rate
    }
    
if (!counselor.clients || counselor.clients === "" || counselor.clients.length === 0) {
  // fieldName is either undefined, null, empty string, or empty array
  counselor.clients = 1
} else {
  counselor.clients = counselor.clients +1
}
    await counselor.save();

    
  } catch (err) {
    console.log(err.message);
  }
}
