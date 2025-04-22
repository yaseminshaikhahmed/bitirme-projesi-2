const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user:{ //get the user who left this comment 
             
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', // Refers to the "User" model
            required:true
    },
    rating:{
        type: Number,
        max:5,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

// const Comment = mongoose('comment', commentSchema)
// module.exports = Comment