const User = require('../models/User')
const Feeling = require('../models/Feeling')


module.exports.profile_get = async (req, res) => {
    try {
        const userId = req.user._id;
        const feelingPosts = await Feeling.find({ user_id: userId });
        
        res.render('../public/views/profile', { 
            feelingPosts: feelingPosts 
        });
        
    } catch(err) {
        console.log(err.message);
        res.status(500).render('../public/views/profile', { 
            error: 'Error loading posts' 
        });
    }
}

module.exports.profile_put = async (req, res) => {
    try{
        const id = req.user._id
        const {name, bio} = req.body
        const picture = req.file
        console.log(picture)

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {name, picture:req.file.filename, bio},
            { new:true, runValidators:true }
        )
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          res.status(200).json({ message: 'Profile updated', user: updatedUser });

    }catch(err){
        console.error('Error updating profile:', err.message);
    res.status(500).json({ error: 'Failed to update profile' });

    }
}

module.exports.profile_delete = async (req, res)=>{
    const _id = req.body
    console.log(_id)
    try{
        

        const deletedFeeling = await Feeling.deleteOne({_id})
        res.status(200).json({message:"Post is deleted", DeletedFeeling:deletedFeeling})
        
    }
    catch(err){
        console.log(err.message)
    }
}


