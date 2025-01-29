const express = require("express");
const jobRouter = express.Router();

const adminMiddlewares = require("../middleware/adminMiddleware");

const jobControllers = require("../controller/jobController");
jobRouter.post('/create-job',adminMiddlewares.isAdmin,jobControllers.createJob);
jobRouter.put("/update-job/:id",jobControllers.updateJob);
jobRouter.get("/delete-job/:id",jobControllers.deleteJob);


module.exports = jobRouter;