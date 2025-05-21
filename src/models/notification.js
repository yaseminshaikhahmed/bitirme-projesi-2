const mongoose = require('mongoose')
const counselor = require('./counselor')

const notificationSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    time:{//the notification will display how long ago it was sent
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        
        href:'user'
    }

})

notificationSchema.add({
    date:{
        type:String,
        required:true
    },
     counselor:{
        type:mongoose.Schema.Types.ObjectId,
        
        href:'counselor'
    }
})

const Notification = mongoose.model('notification', notificationSchema)

module.exports = Notification