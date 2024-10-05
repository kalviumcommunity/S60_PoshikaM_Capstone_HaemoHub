const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : { 
        type : String, 
        required : [true, "*name is required"], 
        unique : true 
    },
    email : { 
        type : String, 
        required : [true, "*email is required"], 
        unique : true 
    },
    password : { 
        type : String, 
        required : [true, "*password is required"] 
    },
    role : {
        type : String,
        default : "user"
    },
    profileImage : {
        type : String
    }
})

module.exports = userSchema;