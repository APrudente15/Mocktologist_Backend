const { Router } = require("express");

const drinkController = require("../controllers/drink.js");

const drinkRouter = Router();

drinkRouter.post("/accept", drinkController.create);
drinkRouter.get("/all/:id", drinkController.showCompleted);
drinkRouter.get("/current/:id", drinkController.showCurrent);
drinkRouter.delete("/:id", drinkController.destroy);
drinkRouter.patch("/rate/:id", drinkController.updateRating);
drinkRouter.patch("/picture/:id", drinkController.updatePicture);

module.exports = drinkRouter;