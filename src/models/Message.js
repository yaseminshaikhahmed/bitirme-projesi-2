const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    content:{
        type:String,
        required:true,

    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    counselor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Counselor',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

})

const Message = mongoose.model('message',messageSchema)
module.exports = Message