const express = require("express");
const server = express();
require("dotenv").config();


server.use(express.json());
const connectDB = require("./config/db");
connectDB.dbConnect();


const userProfileRouters = require('./routers/userProfileRouter');
server.use('/api/user-profile',userProfileRouters);



const port = 8080;
server.listen(port, () => {
     console.log(`Server is running on the PORT ${port}`);
});