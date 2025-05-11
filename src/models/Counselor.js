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

counselorSchema.add({
    rating:{
        type:Number,
        max:5,
        default:5,
    },
    clients:{
        type:Number,
        defualt:0
    }
})

counselorSchema.add({
    yearOfExperience:{
        type:Number,
        required:true
    }

})

//fire a function after doc saved to db - mongoose hooks
counselorSchema.post('save', function(doc, next){
    console.log('new counselor was created & saved', doc)

    next()

})
//bcrypting the password
counselorSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//static method to login counselor
counselorSchema.statics.login = async function(email, password){
    const counselor = await this.findOne({ email })
    if(counselor){
      const auth = await bcrypt.compare(password, counselor.password)
      if(auth){
        return counselor
      }
      throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


//Creating the table in the data base

const Counselor = mongoose.model('counselor', counselorSchema)
module.exports = Counselor