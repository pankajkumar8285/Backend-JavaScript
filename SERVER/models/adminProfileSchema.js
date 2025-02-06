const mongoose = require("mongoose");

const adminProfileSchemas = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    image: {
        type: String,
        default : ""
    }
})

module.exports = mongoose.model("admin",adminProfileSchemas);