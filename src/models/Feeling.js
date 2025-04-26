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
feelingSchema.add({
    user_id:{ //get the user's id that took this session
             
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', // Refers to the "User" model
            required:true
        }
})

//middleware
feelingSchema.pre('save', function(next){
    console.log('Trying to save: ')
    next()
})
feelingSchema.post('save', function(doc, next){
    console.log('new feeling was created & saved', doc)
    next()
})


const Feeling = mongoose.model('feeling', feelingSchema)
module.exports = Feeling