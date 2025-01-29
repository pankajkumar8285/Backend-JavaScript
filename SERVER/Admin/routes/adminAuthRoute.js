const express = require("express");
const adminAuthRouter = express.Router();


const adminAuthController = require("../controller/adminAuthController");
adminAuthRouter.post('/admin-login',adminAuthController.adminProfileLogin);



module.exports = adminAuthRouter;