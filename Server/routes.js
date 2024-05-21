const express = require("express");
const { userCollection, donorCollection, bloodDataCollection } = require("./schema");

const app = express();

app.get("/getData", (request, response) => {
    // response.send("I am get request.")
    bloodDataCollection.find({})
    .then((bloodBankData) => { response.json({bloodBankData}) })
    .catch((error) => { response.json({error}) })
})

app.post("/post", (request, response) => {
    response.send("I am post request")
})

app.put("/put/:id", (request, response) => {
    response.send("I am put request")
})

app.delete("/delete/:id", (request, response) => {
    response.send("I am delete request")
})

// Users
app.post("/signup", (request, response) => {
    userCollection.create(request.body)
    .then(data => response.json(data))
    .catch(error => response.json(error))
})

module.exports = app;