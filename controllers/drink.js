const Drink = require('../models/drink.js');
const openai = require('../aiSetup.js');

async function newResponse (req, res) {
    try {
        const tastes = req.headers.tastes;
        const vegan = req.headers.vegan;
        const allergens = req.headers.allergens
        let prompt;

        if (vegan) {
            prompt = `Make me a recipe for a mocktail that has a ${tastes} taste, is vegan. In each instruction, explain why the step is necessary. Do not separate the instruction and the explanation. I am allergic to ${allergens}, so please do not include these ingredients. The format should be: Name of the mocktail\nTaste profile\nIngredients required\nInstructions\nNutritional Info`
        } else {
            prompt = `Make me a recipe for a mocktail that has a ${tastes} taste. In each instruction, explain why the step is necessary. Do not separate the instruction and the explanation. I am allergic to ${allergens}, so please do not include these ingredients. The format should be: Name of the mocktail\nTaste profile\nIngredients required\nInstructions\nNutritional Info`
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", content: prompt}]
        });

        const responseMessage = response.choices[0].message.content

        const drink = {
            name: responseMessage.slice(responseMessage.indexOf(":")+2, responseMessage.indexOf("\n")),
            body: responseMessage.slice(responseMessage.indexOf("\n")+1, responseMessage.length-1),
            tastes: tastes,
            vegan: vegan
        }
        res.status(200).send(drink);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
}

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

async function updatePicture (req, res) {
    try {
        const id = parseInt(req.params.id);
        const drink = await Drink.getOneById(id);
        const changedDrink = await drink.updatePicture(req.body);
        res.status(200).json(changedDrink);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function getTop3 (req, res) {
    try {
        const user = parseInt(req.params.id);
        const drinks = await Drink.getTopByUser(user);
        res.status(200).json(drinks);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

module.exports = {
    create, showCompleted, showCurrent, destroy, updateRating, updatePicture, getTop3, newResponse
};