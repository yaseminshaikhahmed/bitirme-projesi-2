const mongoose = require('mongoose')
const { isEmail } = require('validator') // to make sure the input is a valid email
const bcrypt = require('bcrypt') //for password encryption


const userSchema = new mongoose.Schema({
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
        type: String
    }

    
})

userSchema.add({
    bio:{
        type:String,
        maxlength:300
    }
})

  


//fire a function after doc saved to db - mongoose hooks
userSchema.post('save', function(doc, next){
    console.log('new user was created & saved', doc)

    next()

})

//fire a function before doc saved to db - 
// used to encrypt passwords before 
//saving them in the database
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email })
    if(user){
      const auth = await bcrypt.compare(password, user.password)
      if(auth){
        return user
      }
      throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema)
module.exports = User
