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
        ref: 'User', // Refers to the "User" model
        
    },
    counselor:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Counselor', // Refers to the "User" model
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

const Session = mongoose.model('session',sessionSchema)
module.exports =Session