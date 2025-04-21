const mongoose = require('mongoose')
const { isEmail } = require('validator') // to make sure the input is a valid email
const bcrypt = require('bcrypt') //for password encryption

const counselorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        lowercase: true,
        unique: false
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase:true,
        validate: [isEmail,"Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    picture: {
        type: String,
        required:[true, 'Resiminizi Ekleyen']
    },
    experience:{
        type: String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

})


//Creating the table in the data base

// const Counselor = mongoose.model('counselor', counselorSchema)
// module.exports = Counselor