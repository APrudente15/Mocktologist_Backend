const { Router } = require('express');


const userController = require('../controllers/user.js');
const User = require('../models/user.js');

const userRouter = Router();

userRouter.get("/", authenticator, userController.index);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.patch("/:id", authenticator, userController.update);
userRouter.delete("/logout", authenticator, userController.destroy);
userRouter.get("/:token", userController.showToken);
userRouter.get("/count/:id", authenticator, userController.showCount);


module.exports = userRouter;