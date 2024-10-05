const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userSchema = require("./Schemas/userSchema")
const bloodBankSchema = require("./Schemas/bloodBankSchema")
const donorSchema = require("./Schemas/donorSchema")
const StockSchema = require("./Schemas/bloodStockSchema")
dotenv.config()

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
const bloodDataCollection = mongoose.model("bloodStockData", StockSchema)
const bloodBankCollection = mongoose.model("bloodBankData", bloodBankSchema)

// bloodDataCollection.insertMany(BloodBankData)
// .then(() => console.log("Blood Data is added to mongodb"))
// .catch((error) => console.log("Error in sending data to mongodb",error))

module.exports = { userCollection, donorCollection, bloodDataCollection, bloodBankCollection }