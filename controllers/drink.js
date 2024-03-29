const Drink = require('../models/drink.js');
const openai = require('../aiSetup.js');

async function newResponse (req, res) {
    try {
        const tastes = req.headers.tastes;
        const vegan = req.headers.vegan;
        const allergens = req.headers.allergens
        let prompt;

        if (vegan) {
            if(allergens) {
                prompt = `Make me a recipe for a mocktail that has a ${tastes} taste, is vegan. In each instruction, explain why the step is necessary. Do not separate the instruction and the explanation. I am allergic to ${allergens}, so please do not include these ingredients. The format should be: Name Taste profile Ingredients Instructions`
            } else {
                prompt = `Make me a recipe for a mocktail that has a ${tastes} taste, is vegan. In each instruction, explain why the step is necessary. Do not separate the instruction and the explanation. The format should be: Name Taste profile Ingredients Instructions`
            }
        } else {
            if(allergens) {
                prompt = `Make me a recipe for a mocktail that has a ${tastes} taste. In each instruction, explain why the step is necessary. Do not separate the instruction and the explanation. I am allergic to ${allergens}, so please do not include these ingredients. The format should be: Name Taste profile Ingredients Instructions`
            } else {
                prompt = `Make me a recipe for a mocktail that has a ${tastes} taste. In each instruction, explain why the step is necessary. Do not separate the instruction and the explanation. The format should be: Name Taste profile Ingredients Instructions`
            }
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", content: prompt}]
        });

        const responseMessage = response.choices[0].message.content
        const body = responseMessage.slice(responseMessage.indexOf("\n")+1, responseMessage.length-1)
        const newBody = body.split("\n");
        
        if(!(responseMessage.slice(0, responseMessage.indexOf("\n")))) {
            throw new Error("No Name!");
        }
        let name;

        if(responseMessage.indexOf("Name") !== -1) {
            name = responseMessage.slice(responseMessage.indexOf(":")+2, responseMessage.indexOf("\n"))
        } else {
            name = responseMessage.slice(0, responseMessage.indexOf("\n"))
        }

        function removeBlank(value, index, arr) {
            if (value == "") {
                arr.splice(index, 1);
                return true;
            }
            return false;
        }

        const removed = newBody.filter(removeBlank);

        const drink = {
            name: name,
            body: newBody,
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
        req.body.body = JSON.stringify(req.body.body)
        const drink = await Drink.create(req.body);
        drink.body = JSON.parse(drink.body);
        res.status(201).json(drink);
    } catch (err) {
        res.status(409).json({"error": err.message})
    }
}

async function showCompleted (req, res) {
    try {
        const user = parseInt(req.params.id);
        const drinks = await Drink.getByUserCompleted(user);
        if(drinks.length > 0) {
            drinks.forEach((drink) => JSON.parse(drink.body))
        }
        res.status(200).json(drinks);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function showCurrent (req, res) {
    try {
        const user = parseInt(req.params.id);
        const drink = await Drink.getByUserCurrent(user);
        drink.body = JSON.parse(drink.body);
        res.status(200).json(drink);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function completeCurrent (req, res) {
    try {
        const user = parseInt(req.params.id);
        const drink = await Drink.getByUserCurrent(user);
        await drink.complete();
        res.status(200).json(drink);
        //res.status(200).json("Drink Done!");
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
        changedDrink.body = JSON.parse(changedDrink.body);
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
        changedDrink.body = JSON.parse(changedDrink.body);
        res.status(200).json(changedDrink);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const drink = await Drink.getOneById(id);
        const changedDrink = await drink.update(req.body);
        changedDrink.body = JSON.parse(changedDrink.body);
        res.status(200).json(changedDrink);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function getTop3 (req, res) {
    try {
        const user = parseInt(req.params.id);
        const drinks = await Drink.getTopByUser(user);
        if(drinks.length > 0) {
            drinks.forEach((drink) => JSON.parse(drink.body))
        }
        res.status(200).json(drinks);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const drink = await Drink.getOneById(id);
        drink.body = JSON.parse(drink.body);
        res.status(200).json(drink);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

module.exports = {
    create, showCompleted, showCurrent, completeCurrent, destroy, updateRating, updatePicture, update, getTop3, newResponse, show
};