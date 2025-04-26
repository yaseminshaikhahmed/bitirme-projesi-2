const Feeling = require('../models/Feeling')

module.exports.homepage_get = (req, res)=>{
    res.render('../public/views/homepage')
}
// module.exports.homepage_post = async(req, res)=>{
    
//     try{
//          //console.log(req.body)
//         const {date, time, content} = req.body
//         const feeling = await Feeling.create(
//             { date, time, content }
//         )
//         res.status(201).json({feeling})
//         console.log("in homepageController.js Everything is fine")
        

//     }catch(err){
//         // console.log(req.body)
//         res.status(400).json({err})
//         console.log("in homepageController.js it's not working")
//     }


// }
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