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

    if(request.body.password != request.body.confirmPassword){
        return response.status(400).json({ 
            errors : {
                confirmPassword: { message : "Passwords do not match" }
            } 
        })
    }

    userCollection.create(request.body)
    .then(data => response.json(data))
    .catch(error => {
        if(error.name === "ValidationError"){
            response.status(400).json({ errors : error.errors })
        }
        else if(error.code === 11000 && error.keyValue.email){
            response.status(400).json({
                errors : {
                    email : { message : "Email already exists. Try to Log in or give other email" }                
                }
            })
        }
        else if(error.code === 11000 && error.keyValue.name){
            response.status(400).json({
                errors : {
                    name : { message : "UserName is already taken. Please give some other name" }
                }
            })
        }
        else{
            response.status(500).json( { message : "Internal Server error"} )
        }
    })
})

module.exports = app;