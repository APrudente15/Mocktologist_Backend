const { Router } = require("express");

const drinkController = require("../controllers/drink.js");

const drinkRouter = Router();

drinkRouter.get("/", drinkController.newResponse);
drinkRouter.post("/accept", drinkController.create);
drinkRouter.get("/all/:id", drinkController.showCompleted);
drinkRouter.get("/current/:id", drinkController.showCurrent);
drinkRouter.patch("/complete/:id", drinkController.completeCurrent);
drinkRouter.delete("/:id", drinkController.destroy);
drinkRouter.patch("/rate/:id", drinkController.updateRating);
drinkRouter.patch("/image/:id", drinkController.updatePicture);
drinkRouter.get("/top/:id", drinkController.getTop3);

module.exports = drinkRouter;