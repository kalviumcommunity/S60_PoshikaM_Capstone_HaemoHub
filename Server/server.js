const express = require("express")

const app = express()

app.get("/", (request, response) => {
    response.send("Hi! Iam server")
})

app.listen(3006, () => {
    console.log("Server is successfully working !!")
})