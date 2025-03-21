const express = require("express");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser")
const { userCollection, donorCollection, bloodDataCollection, bloodBankCollection, storyCollection, chatCollection } = require("./schema");
const { passHash, comparePassword } = require("./passHash");
const AuthenticateToken = require("./auth");

const app = express();
app.use(cookieparser())
app.use(express.urlencoded({extended:false}))

app.get('/stories', (req, res) => {
    storyCollection.find()
        .then(stories => {
            res.status(200).json(stories);
        })
        .catch(error => {
            res.status(500).json({ message: 'Error fetching stories', error });
        });
});

app.post("/writeStories", async (request, response) => {
    const { email, story } = request.body

    storyCollection.create({ email, story })
    .then(story =>  response.json(story))
    .catch(error => response.json(error))
})

app.put("/stories/:id", async (request, response) => {
    // response.send("I am put request")
    const { id } = request.params;
    const { email, story } = request.body;

    try {
        const updatedStory = await storyCollection.findByIdAndUpdate(id, { email, story }, { new: true });
        if (!updatedStory) {
            return response.status(404).json({ error: "Story not found" });
        }
        response.status(200).json(updatedStory);
    } catch (error) {
        response.status(400).json({ error: "Error updating story", details: error });
    }
});

app.delete("/stories/:id", async (req, res) => {
    // response.send("I am delete request")
    try {
        const storyId = req.params.id;
        const deletedStory = await storyCollection.findByIdAndDelete(storyId);

        if (!deletedStory) {
            return res.status(404).json({ message: 'Story not found' });
        }

        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting story', error });
    }
});

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

// Users
app.get("/user", (request, response) => {
    // response.send("I am get request.")
    userCollection.find({})
    .then((bloodBankData) => { response.json({bloodBankData}) })
    .catch((error) => { response.json({error}) })
})

app.post("/signup", async(request, response) => {

const {name, email, password} = request.body;

    const hapassword = await passHash(password)

    userCollection.create({
        name,
        email,
        password : hapassword,
    })
    .then(user => {
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, 
            process.env.SECRET, 
            // { expiresIn: '1h' } // Token expiration time
        );

        response.json({ 
            message: "User registered successfully", 
            token, 
            user: { id: user._id, email: user.email, role: user.role }
        });
    })
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

app.post("/Login", async (request, response) => {
    try{
        const email = request.body.email.trim()
        const password = request.body.password.trim()

        const user = await userCollection.findOne({ email }).lean()

        if(!user){
            return response.json({ error : "no user found"})
        }

        const passMatch = comparePassword(password, user.password)
        if(!passMatch){
            return response.status(400).json({ error : "Invalid Password"})
        }

        const token = jwt.sign(
            { id : user._id, email : user.email, role : user.role },
            process.env.SECRET
        )

        response.json({
            message : "Login Successful",
            token,
            user : { id : user._id, email : user.email, role : user.role }
        })
    }
    catch{
        console.log("Login Error")
        response.status(500).json({ message : "Internal Server error"})
    }
})

app.post("/upload-profile-image", async (request, response) => {
    const { user, imageUrl } = request.body;

    console.log("Received user ID:", user.id);
    console.log("Received image URL:", imageUrl);

    try {
        await userCollection.updateOne(
            { _id: user.id },
            { $set: { profileImage: imageUrl } }
        );

        response.json({ message: "Profile image updated successfully!" });
    } catch (error) {
        response.status(500).json({ message: "Failed to update profile image" });
    }
});

app.post("/chat", async (req, res) => {
    try {
      const { message } = req.body;
  
      // Fetch response from Groq AI API
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [{ role: "user", content: message }],
        }),
      });
  
      const data = await response.json();
      
      // Log the entire API response
    //   console.log("Groq API Response:", data);
  
      // Check if API returned a valid response
      if (!data.choices || data.choices.length === 0) {
        return res.json({ reply: "Sorry, I didn't understand." });
      }
  
      const botReply = data.choices[0].message.content;
  
      // Store chat in MongoDB
      const newChat = new chatCollection({ userMessage: message, botResponse: botReply });
      await newChat.save();
  
      res.json({ reply: botReply });
    } catch (error) {
    //   console.error("Error fetching response:", error);
      res.status(500).json({ error: "Something went wrong!" });
    }
  });
  
//   app.get("/chat-history", async (req, res) => {
//     try {
//       const chats = await chatCollection.find().sort({ timestamp: -1 });
//       res.json(chats);
//     } catch (error) {
//       console.error("Error retrieving chat history:", error);
//       res.status(500).json({ error: "Error retrieving chat history" });
//     }
//   });

module.exports = app;