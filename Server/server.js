const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const routes = require("./routes")

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.CONNECTDB_URL)
.then(() => {
    console.log("Connect with mongodb database")
})
.catch(() =>{
    console.log("error in connecting")
})

app.use("/", routes)

app.get("/", (request, response) => {
    response.send("Hi ! Iam server")
})

app.listen(3006, () => {
    console.log("Server is successfully working !!")
})