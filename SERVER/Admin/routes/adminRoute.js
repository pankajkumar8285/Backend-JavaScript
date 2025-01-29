const express = require("express");
const adminRouter = express.Router();

const adminProfileController = require("../controller/adminControllers");
adminRouter.post('/admin-created',adminProfileController.createAdminProfile);
adminRouter.put("/update-admin/:id",adminProfileController.adminProfileUpdate);
adminRouter.get("/get-admin/:id",adminProfileController.adminProfile);

module.exports = adminRouter;