const mongoose = require("mongoose")

const StockSchema = mongoose.Schema({
    state : {
        type : String,
        required : [true, "*state is required"]
    },
    blood_group : { 
        type : String, 
        required : [true, "*blood group is required"],
        enum : ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },
    units_available : { 
        type : Number, 
        required : [true, "*fill units available"] 
    },
    blood_bank : { 
        type : String, 
        required : [true, "*blood bank name is required"] 
    }
})

module.exports = StockSchema;