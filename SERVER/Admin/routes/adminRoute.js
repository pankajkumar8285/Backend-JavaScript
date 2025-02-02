const express = require("express");
const adminRouter = express.Router();
const imgMiddleware = require("../../middleware/imgUpload");
const verifyAdmin = require("../middleware/adminMiddleware");

const adminProfileController = require("../controller/adminControllers");
adminRouter.post('/admin-created',adminProfileController.createAdminProfile);
adminRouter.put("/update-admin",verifyAdmin.isAdmin,imgMiddleware.upload,adminProfileController.adminProfileUpdate);
adminRouter.get("/get-admin",adminProfileController.adminProfile);

module.exports = adminRouter;