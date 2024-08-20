const mongoose = require("mongoose")

const bloodBankSchema = mongoose.Schema({
    blood_bank : {
        type : String,
        required : [true, "*enter blood bank name"],
        unique : true
    },
    state : {
        type : String,
        required : [true, "*state is required"]
    },
    address : {
        type : String,
        required : [true, "*address is required"],
        unique : true
    },
    city : {
        type : String,
        required : [true, "*city is required"]
    },
    email : {
        type : String, 
        required : [true, "*email is required"],
        unique : true,
        match : [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "*email is invalid"]
    },
    contact : {
        type : String,
        required  : [true, "*contact number is required"],
        minlength : [10, "*contact number must be exactly 10 digits"],
        maxlength : [10, "*contact number must be exactly 10 digits"],
        match : [/^\d{10}$/, "*contact number must be exactly 10 digits"]
    },
    password : {
        type :  String,
        required :  [true, "*password is required"]
    },
    role : {
        type : String,
        default : "bloodbank"
    }
})

module.exports = bloodBankSchema;