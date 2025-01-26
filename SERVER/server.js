const express = require("express");
const server = express();
require("dotenv").config();


server.use(express.json());
const connectDB = require("./config/db");
connectDB.dbConnect();

const adminProfileRouter = require("./Admin/adminRoute");
server.use("/api/admin-profile",adminProfileRouter)
const adminAuthRoute = require("./Admin/adminAuthRoute");
server.use('/api/admin-auth',adminAuthRoute);


const userProfileRouters = require('./routers/userProfileRouter');
server.use('/api/user-profile',userProfileRouters);

const userAuthRouters = require('./routers/userAuthRouter');
server.use('/api/user-auth',userAuthRouters);


const port = process.env.PORT;
server.listen(port, () => {
     console.log(`Server is running on the PORT ${port}`);
});