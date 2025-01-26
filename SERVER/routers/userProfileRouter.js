const express = require("express");
const userProfileRoute = express.Router();
const imgMiddleware = require("../middleware/imgUpload")



const userProfileController = require("../controllers/userProfileController");
userProfileRoute.post("/create-profile",userProfileController.createProfile);
userProfileRoute.put("/update-profile/:id",imgMiddleware.upload,userProfileController.updateProfile);
userProfileRoute.put("/delete-profile/:id",userProfileController.deleteProfile);
userProfileRoute.get("/get-profile/:id",userProfileController.userProfile);


module.exports = userProfileRoute;