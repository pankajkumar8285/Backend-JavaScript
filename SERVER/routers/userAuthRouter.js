const express = require("express");
const userAuthRoutes = express.Router();

const userAuthControlles = require("../controllers/userAuthController");
userAuthRoutes.post('/user-login',userAuthControlles.userProfileLogin);



module.exports = userAuthRoutes;