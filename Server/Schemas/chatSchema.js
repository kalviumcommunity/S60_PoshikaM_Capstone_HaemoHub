const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    userMessage : String,
    aiResponse : String,
    timestamp : { type : Date, default : Date.now }
})

module.exports = chatSchema;