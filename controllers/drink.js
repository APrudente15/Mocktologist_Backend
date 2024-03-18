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
        const user = parseInt(req.params.id)
        const drink = await Drink.getByUserCompleted(user);
        res.status(200).json(drink);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

module.exports = {
    create, showCompleted
};