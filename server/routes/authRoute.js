const userRouter = require('express').Router();
const userController = require("../controllers/authController");

// Post a new user
userRouter.post("/register", userController.register);
// Login a user
userRouter.post("/login", userController.login);

//export
module.exports = userRouter;
