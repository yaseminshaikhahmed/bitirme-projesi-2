const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        
        href:'user'
    }

})

const Notification = mongoose.model('notification', notificationSchema)

module.exports = Notification