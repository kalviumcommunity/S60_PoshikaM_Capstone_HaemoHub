const mongoose = require("mongoose")

const storySchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    story : {
        type :String,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
})

module.exports = storySchema;