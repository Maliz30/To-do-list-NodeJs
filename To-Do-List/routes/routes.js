const routes = require("express").Router();
const TaskController = require("../controller/TaskController");
const AuthController = require("../controller/AuthController");

routes.get("/", TaskController.getAllTasks);
routes.post("/create", TaskController.createTask);
routes.get("/getById/:id/:method", TaskController.getById);
routes.post("/updateOne/:id", TaskController.updateOneTask);
routes.get("/deleteOne/:id", TaskController.deleteOneTask);
routes.get("/check/:id", TaskController.taskCheck);

routes.post("/register", AuthController.registerUser);
routes.post("/authenticate", AuthController.authenticateUser);

module.exports = routes;
