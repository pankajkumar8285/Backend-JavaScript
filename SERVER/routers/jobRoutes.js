const express = require("express");
const userJobRoutes = express.Router();

const verifyUser = require("../middleware/userAuthMiddleware");



const jobControlles = require("../controllers/jobApplyController");
userJobRoutes.post('/apply-job',verifyUser.isUser,jobControlles.applyJob);
userJobRoutes.get('/job-list',verifyUser.isUser,jobControlles.jobList);
userJobRoutes.get("/applied-jobs-list",verifyUser.isUser,jobControlles.getAppliedJob);


module.exports = userJobRoutes;