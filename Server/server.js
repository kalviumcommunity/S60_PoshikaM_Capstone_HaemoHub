const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const app = express()
dotenv.config()

mongoose.connect(process.env.CONNECTDB_URL)
.then(() => {
    console.log("Connect with mongodb database")
})
.catch(() =>{
    console.log("error in connecting")
})

app.get("/", (request, response) => {
    response.send("Hi ! Iam server")
})

app.listen(3006, () => {
    console.log("Server is successfully working !!")
})