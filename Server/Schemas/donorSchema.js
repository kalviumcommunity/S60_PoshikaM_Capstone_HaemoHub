const mongoose =  require("mongoose")

const donorSchema = mongoose.Schema({
    name : { 
        type : String, 
        required : true, 
        unique : true 
    },
    email : { 
        type : String, 
        required : true, 
        unique : true 
    },
    Phnumber : { 
        type : Number, 
        required : true 
    },
    Gender :  { 
        type : String, 
        required : true 
    },
    age : { 
        type : Number, 
        required : true 
    },
    password : { 
        type : String, 
        required : true 
    },
    confirmPassword : { 
        type : String, 
        required : true 
    },
    state : { 
        type : String, 
        required : true 
    }
})

module.exports =  donorSchema;