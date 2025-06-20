const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
   date:{
        type:String,
        required:true
    } ,
   time:{
        type:String,
        required:true
    } ,
    user:{ //get the user's id that took this session
         
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' // Refers to the "User" model
        
    },
    counselor:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'counselor', // Refers to the "User" model
        required:true
    },
    duration:{ // stored in seconds
        type:Number,
        required:true
    },
    completed:{
        type:Boolean,
        
        default:false
    }
}) 
//price - taken:bool - 
sessionSchema.add({
    price:{
        type:Number,
        required:true,
        default:500
    }

})

sessionSchema.add({
    accepted:{
        type:Boolean,
        default:false
    }
})
sessionSchema.add({
    cancelled:{
        type:Boolean,
        default:false
    }
})
sessionSchema.add({
    taken:{
        type:Boolean,
        default:false
    }
})

sessionSchema.add({
    declined:{
        type:Boolean,
        default:false
    }
})



//const Session = mongoose.model('session',sessionSchema)
//module.exports =Session
module.exports = mongoose.models.session || mongoose.model('session', sessionSchema)