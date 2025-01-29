const express = require("express");
const jobRouter = express.Router();

const adminMiddlewares = require("../middleware/adminMiddleware");

const jobControllers = require("../controller/jobController");
jobRouter.post('/create-job',adminMiddlewares.isAdmin,jobControllers.createJob);



module.exports = jobRouter;