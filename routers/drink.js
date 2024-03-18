const { Router } = require("express");

const drinkController = require("../controllers/drink.js");

const drinkRouter = Router();

drinkRouter.post("/accept", drinkController.create);

module.exports = drinkRouter;