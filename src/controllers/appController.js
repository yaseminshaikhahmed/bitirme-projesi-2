const Counselor = require('../models/Counselor')


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