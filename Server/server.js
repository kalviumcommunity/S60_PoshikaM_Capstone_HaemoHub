const express = require("express")
const cors = require("cors")
const routes = require("./routes")
const PORT = process.env.PORT
const { userCollection, donorCollection, bloodDataCollection } = require("./schema")

const app = express()
app.use(cors())
app.use(express.json())

function checkStatus(){
    return bloodDataCollection.db.readyState === 1;
}

app.use("/", routes)

app.get("/", (request, response) => {
    // response.send("Hello! I am the server.")
    const connectionStatus = checkStatus();
    let check = connectionStatus ? "Connected" : "Not Connected";
    response.send(check)
})

app.listen(PORT, () => {
    console.log("Server is successfully working !!")
})