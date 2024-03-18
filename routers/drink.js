const { Router } = require("express");

const drinkController = require("../controllers/drink.js");

const drinkRouter = Router();

drinkRouter.post("/accept", drinkController.create);
drinkRouter.get("/all/:id", drinkController.showCompleted);
drinkRouter.get("/current/:id", drinkController.showCurrent);

module.exports = drinkRouter;