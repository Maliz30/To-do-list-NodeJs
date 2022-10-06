const routes = require("express").Router();
const TaskController = require("../controller/TaskController");
const AuthController = require("../controller/AuthController");
const AuthMiddleware = require("../middlewares/auth");

routes.post("/register", AuthController.registerUser);
routes.post("/authenticate", AuthController.authenticateUser);

routes.use(AuthMiddleware);

routes.get("/home", TaskController.getAllTasks);
routes.post("/create", TaskController.createTask);
routes.get("/getById/:id/:method", TaskController.getById);
routes.post("/updateOne/:id", TaskController.updateOneTask);
routes.get("/deleteOne/:id", TaskController.deleteOneTask);
routes.get("/check/:id", TaskController.taskCheck);





module.exports = routes;
