const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true,

    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: ""
    },

    status:{
        type: String,
        default:"ACTIVE"
    }
},{timestamps: true});


module.exports = mongoose.model('Users',userProfileSchema);