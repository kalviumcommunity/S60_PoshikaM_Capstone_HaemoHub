const mongoose = require("mongoose")
const bloodBankData = require("./BloodData")
const dotenv = require("dotenv")
dotenv.config()

const userSchema = mongoose.Schema({
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
    password : { 
        type : String, 
        required : true 
    },
    confirmPassword : { 
        type : String, 
        required : true 
    }
})

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

const stateSchema = mongoose.Schema({
    state : String,
    bloodData:[{
        blood_group : { 
            type : String, 
            required : true 
        },
        units_available : { 
            type : String, 
            required : true 
        },
        blood_bank : { 
            type : String, 
            required : true 
        }
    }]
})

// Connecting with MongoDB
mongoose.connect(process.env.CONNECTDB_URL)
.then(() => {
    console.log("Connected with mongodb database")
})
.catch((er) =>{
    console.log("error in connecting",er)
})

const userCollection = mongoose.model("userData", userSchema)
const donorCollection = mongoose.model("donorData", donorSchema)
const bloodDataCollection = mongoose.model("bloodData", stateSchema)

// bloodDataColllection.insertMany(bloodBankData)
// .then(() => console.log("Blood Data is added to mongodb"))
// .catch((error) => console.log("Error in sending data to mongodb",error))

module.exports = { userCollection, donorCollection, bloodDataCollection }