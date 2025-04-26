const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    user:{ //get the user's id that took this session
         
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Refers to the "User" model
        required:true
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
        required:true,
        default:false
    }
}) 

const Session = mongoose.model('session',sessionSchema)
module.exports =Session