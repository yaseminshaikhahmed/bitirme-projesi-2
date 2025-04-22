const mongoose = require('mongoose')

const feelingSchema = mongoose.Schema({
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

// const Feeling = mongoose.model('feeling', feelingSchema)
// module.exports = Feeling