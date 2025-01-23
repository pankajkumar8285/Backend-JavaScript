const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    const db_url = "mongodb://localhost:27017/User-detail";
    mongoose.connect(db_url).then(() => {
        console.log("DB connection successfully");
    }).catch(()=> {
        console.log("Error in DB connection");
    })
}