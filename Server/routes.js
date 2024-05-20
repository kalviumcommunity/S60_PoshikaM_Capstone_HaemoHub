const express = require("express");
const { userCollection, donorCollection, bloodDataCollection } = require("./schema");
const bloodBankData = require("./BloodData");

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

module.exports = app;