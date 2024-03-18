const { Router } = require('express');

const userController = require('../controllers/user.js');
const User = require('../models/user.js');

const userRouter = Router();

userRouter.get("/", userController.index);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:logout", userController.destroy);
userRouter.get("/:token", userController.showToken);
userRouter.get("/count/:id", userController.showCount);


module.exports = userRouter;