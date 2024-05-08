const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const routes = require("./routes")

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
PORT = process.env.PORT


mongoose.connect(process.env.CONNECTDB_URL)
.then(() => {
    console.log("Connected with mongodb database")
})
.catch(() =>{
    console.log("error in connecting")
})


app.use("/", routes)

app.get("/", (request, response) => {
    response.send("Hello! I am the server.")
})

app.listen(PORT, () => {
    console.log("Server is successfully working !!")
})