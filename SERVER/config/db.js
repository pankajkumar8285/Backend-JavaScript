const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("DB connection successfully");
    }).catch(()=> {
        console.log("Error in DB connection");
    })
}