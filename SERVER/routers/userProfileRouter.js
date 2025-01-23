const express = require("express");
const userProfileRoute = express.Router();


const userProfileController = require("../controllers/userProfileController");
userProfileRoute.post("/create-profile",userProfileController.createProfile);
userProfileRoute.post("/update-profile/:id",userProfileController.updateProfile);
userProfileRoute.put("/delete-profile/:id",userProfileController.deleteProfile);
userProfileRoute.get("/user-profile-get/:id",userProfileController.userProfile);


module.exports = userProfileRoute;