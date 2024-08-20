const express = require("express");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser")
const { userCollection, donorCollection, bloodDataCollection, bloodBankCollection } = require("./schema");
const { passHash, comparePassword } = require("./passHash");
const AuthenticateToken = require("./auth");

const app = express();
app.use(cookieparser())
app.use(express.urlencoded({extended:false}))

app.get("/getData", (request, response) => {
    // response.send("I am get request.")
    bloodDataCollection.find({})
    .then((bloodBankData) => { response.json({bloodBankData}) })
    .catch((error) => { response.json({error}) })
})

// Blood Bank
app.post("/BloodBankSignup", async (request, response) => {
    // response.send("I am post request")
    const { blood_bank, state, city, address, email, contact, password } = request.body

    const hpassword = await passHash(password)

    bloodBankCollection.create({
        blood_bank, 
        state,
        city, 
        address, 
        email, 
        contact, 
        password : hpassword,
        role : "bloodbank"
    })
    .then(Bdata => response.json(Bdata))
    .catch(error => {
        if(error.name === "ValidationError"){
            response.status(400).json({ errors : error.errors })
        }
        else if(error.code === 11000 && error.keyValue.blood_bank){
            response.status(400).json({
                errors : {
                    blood_bank : { message : "*blood bank name already exists, enter another Name" }
                }
            })
        }
        else if(error.code === 11000 && error.keyValue.address){
            response.status(400).json({
                errors : {
                    address : { message : "*address already exists. Try to login or give another Address" }                
                }
            })
        }
        else if(error.code === 11000 && error.keyValue.email){
            response.status(400).json({
                errors : {
                    email : { message : "*email already exists. Try to login or enter another email address" }
                }
            })
        }
        else{
            response.status(500).json( { message : "*Internal Server Error" } )
        }
    })
})

app.post("/BloodBankLogin", async (request, response) => {
    try{
        const blood_bank = request.body.blood_bank.trim()
        const email = request.body.email.trim()
        const password = request.body.password.trim()

        const bloodbank = await bloodBankCollection.findOne({ email }).lean()

        if(!bloodbank){
            return response.json({ error : "No bloodbank found" })
        }
        if(bloodbank.blood_bank !== blood_bank){
            return response.json({ error : "Blood bank name does not match" })
        }

        const match = await comparePassword(password, bloodbank.password)
        if(match){
            jwt.sign({ email: bloodbank.email, blood_bank : bloodbank.blood_bank, id: bloodbank._id, role: bloodbank.role}, process.env.SECRET, {}, (err, token) => {
                if(err) throw err
                const responseData = {
                    email : bloodbank.email,
                    blood_bank : bloodbank.blood_bank,
                    id : bloodbank._id,
                    role : bloodbank.role,
                    token : token
                }
                response.cookie('token', token).json(responseData)
            })
        }
        else {
            response.status(400).json({ errors : { 
               password : "Incorrect password" } 
            })
        }
    }catch(error){
        console.log("Error:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
})

app.post("/BloodStockUpdate", AuthenticateToken,(request, response) => {
    bloodDataCollection.create(request.body)
    .then(output => response.json(output))
    .catch(error => {
        if(error.name === "ValidationError"){
            response.status(400).json({ errors : error.errors })
        }
    })
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
                confirmPassword: { message : "Password do not match" }
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
                    email : { message : "*email already exists. Try to login or give some other email" }                
                }
            })
        }
        else if(error.code === 11000 && error.keyValue.name){
            response.status(400).json({
                errors : {
                    name : { message : "*UserName is already taken. Enter some other name" }
                }
            })
        }
        else{
            response.status(500).json( { message : "*Internal Server error"} )
        }
    })
})

module.exports = app;