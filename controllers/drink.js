const Drink = require('../models/drink.js');

async function create (req, res) {
    try {
        const drink = await Drink.create(req.body);
        res.status(201).json(drink);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function showCompleted (req, res) {
    try {
        const user = parseInt(req.params.id);
        const drink = await Drink.getByUserCompleted(user);
        res.status(200).json(drink);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function showCurrent (req, res) {
    try {
        const user = parseInt(req.params.id);
        const drink = await Drink.getByUserCurrent(user);
        res.status(200).json(drink);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const drink = await Drink.getOneById(id);
        await drink.destroy();
        res.status(204).send("Successfully deleted");
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function updateRating (req, res) {
    try {
        const id = parseInt(req.params.id);
        const drink = await Drink.getOneById(id);
        const changedDrink = await drink.updateRating(req.body);
        res.status(200).json(changedDrink);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

module.exports = {
    create, showCompleted, showCurrent, destroy, updateRating
};