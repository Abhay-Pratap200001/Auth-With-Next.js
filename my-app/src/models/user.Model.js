import mongoose from 'mongoose'

const userSchema = new  mongoose.Schema({
    username:{
        type: String,
        required: [true, 'user name is required'],
        unique: true
    },

     email:{
        type: String,
        required: [true, 'email is required'],
        unique: true
    },

     password:{
        type: String,
        required: [true, 'password is required'],
        unique: true
    },

     isVerified:{
        type: Boolean,
        default: false
    },

      isAdmin:{
        type: Boolean,
        default: false
    },

    forgotPasswordToken: String,   //for when user forgot password 
    forgotPasswordTokenExpiry: Date,  //for when user forgot password, expiry string 

    verifyToken: String,  //for verifiying user Token string
    verifyTokenExpiry: Date //for verifiying user Token expiry string
})


export const User = mongoose.models.users || mongoose.model("users", userSchema)