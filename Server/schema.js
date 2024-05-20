const mongoose = require("mongoose")
const bloodBankData = require("./BloodData")
const dotenv = require("dotenv")
dotenv.config()

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

const bloodSchema =  mongoose.Schema({
    blood_group : String,
    units_available : String,
    blood_bank :String
})

const stateSchema = mongoose.Schema({
    state : String,
    bloodData:[{blood_group : String,
        units_available : String,
        blood_bank :String}]
})

mongoose.connect(process.env.CONNECTDB_URL)
.then(() => {
    console.log("Connected with mongodb database")
})
.catch((er) =>{
    console.log("error in connecting",er)
})

const userCollection = mongoose.model("userData", userSchema)
const donorCollection = mongoose.model("donorData", donorSchema)
const bloodDataColllection = mongoose.model("bloodData", stateSchema)

// bloodDataColllection.insertMany(bloodBankData)
// .then(() => console.log("Blood Data is added to mongodb"))
// .catch((error) => console.log("Error in sending data to mongodb",error))

// console.log(bloodBankData)
module.exports = { userCollection: userCollection, donorCollection : donorCollection, bloodDataColllection : bloodDataColllection }