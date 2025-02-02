const express = require("express");
const userAuthRoutes = express.Router();

const userAuthControlles = require("../controllers/userAuthController");
userAuthRoutes.post('/user-login',userAuthControlles.userProfileLogin);
userAuthRoutes.get("/user-logout",userAuthControlles.userLogout);



module.exports = userAuthRoutes;