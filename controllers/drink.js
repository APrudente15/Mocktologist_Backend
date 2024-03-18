const Drink = require('../models/drink.js');

async function create (req, res) {
    try {
        const drink = await Drink.create(req.body);
        res.status(201).json(drink);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = {
    create
};