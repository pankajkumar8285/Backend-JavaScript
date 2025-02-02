const express = require("express");
const userProfileRoute = express.Router();
const imgMiddleware = require("../middleware/imgUpload")
const verifyUser = require("../middleware/userAuthMiddleware");



const userProfileController = require("../controllers/userProfileController");
userProfileRoute.post("/create-profile",userProfileController.createProfile);
userProfileRoute.put("/update-profile",verifyUser.isUser,imgMiddleware.upload,userProfileController.updateProfile);
userProfileRoute.put("/delete-profile",userProfileController.deleteProfile);
userProfileRoute.get("/get-profile",userProfileController.userProfile);


module.exports = userProfileRoute;