const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    confirmPassword : String
})

const donorSchema = mongoose.Schema({
    name : String,
    email :String,
    Phnumber : Number,
    Gender : String,
    age : Number,
    password : String,
    confirmPassword : String,
    state : String
})

const userCollection = mongoose.model("userData", userSchema)
const donorCollection = mongoose.model("donorData", donorSchema)

module.exports= { userCollection: userCollection, donorCollection : donorCollection }