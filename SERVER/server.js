const express = require("express");
const server = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");


server.use(cookieParser());
server.use(express.json());

//db connection
const connectDB = require("./config/db");
connectDB.dbConnect();

// Admin routers
const adminProfileRouter = require("./Admin/routes/adminRoute");
server.use("/api/admin-profile",adminProfileRouter)

const adminAuthRoute = require("./Admin/routes/adminAuthRoute");
server.use('/api/admin-auth',adminAuthRoute);

const jobRouters = require("./Admin/routes/jobRoutes");
server.use('/api/job',jobRouters);


// User Routers
const userProfileRouters = require('./routers/userProfileRouter');
server.use('/api/user-profile',userProfileRouters);
const userAuthRouters = require('./routers/userAuthRouter');
server.use('/api/user-auth',userAuthRouters);
const jobRoute = require("./routers/jobRoutes");
server.use('/api/userjob',jobRoute);


const port = process.env.PORT;
server.listen(port, () => {
     console.log(`Server is running on the PORT ${port}`);
});