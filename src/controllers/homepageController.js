const Feeling = require('../models/Feeling')
const Notification = require('../models/notification')

module.exports.homepage_get = async(req, res)=>{
    const user = req.user._id
    const notifications = await Notification.find({
        user:user
    })
    
    res.render('../public/views/homepage',{
        notifications:notifications
    })
}

//creating a feeling 

module.exports.homepage_post = async (req, res) => {
    try {
        // Better validation
        if (!req.body || !req.body.date || !req.body.time || !req.body.content) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const userId = req.user._id
        console.log(userId)
        const { date, time, content} = req.body;
        
        const feeling = await Feeling.create({ date, time, content, user_id:userId });
        
        console.log("Successfully created feeling:", feeling);
        res.status(201).json({ 
            success: true,
            data: feeling 
        });

    } catch (err) {
        console.error("Error in homepageController.js:", err);
        
        // More specific error handling
        if (err.name === 'ValidationError') {
            return res.status(422).json({ 
                error: "Validation failed",
                details: err.errors 
            });
        }
        
        res.status(500).json({ 
            error: "Server error",
            message: err.message 
        });
    }
};

module.exports.homepage_delete = async (req, res) =>{
    const id = req.query.id// id of notification
    try{
        const deletedNot = await Notification.findByIdAndDelete(id)
        

    }
    catch(err){

    }
}