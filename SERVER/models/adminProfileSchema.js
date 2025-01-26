const mongoose = require("mongoose");

const adminProfileSchemas = new mongoose.Schema({
    email: {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("admin",adminProfileSchemas);