const User = require('../models/User')


module.exports.profile_get = (req, res)=>{
    res.render('../public/views/profile')
}

module.exports.profile_put = async (req, res) => {
    try{
        const id = req.user._id
        const {name, picture, bio} = req.body

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {name, picture, bio},
            { new:true, runValidators:true }
        )
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          res.status(200).json({ message: 'Profile updated', user: updatedUser });

    }catch(err){
        console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Failed to update profile' });

    }
}



