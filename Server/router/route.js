const express = require("express");
const route = express.Router();

const taskController = require("../controller/controllers");

route.get("/todos", taskController.getTasks);
route.post("/todos", taskController.postTasks);
route.put("/todos/:id", taskController.putTasks);
route.delete("/todos/:id", taskController.deleteTasks);

module.exports = route;