const User = require("../models/user.js");
const Token = require("../models/token.js");
const bcrypt = require("bcrypt");

async function index (req,res) {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function register (req, res) {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        data.password = await bcrypt.hash(data.password, salt);

        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function showToken (req, res) {
    try {
        const data = req.params.token;
        const token = await Token.getOneByToken(data);
        const user = await User.getOneById(token.user);

        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function showCount (req, res) {
    try {
        const data = req.params.token;
        const count = await Count.getOneByToken(data);
        const user = await User.getOneById(count.user);

        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function login(req, res) {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email }); 

        if (!user) {
            throw new Error('User not found');
        }

        const authenticated = await bcrypt.compare(data.password, user.password);

        if (!authenticated) {
            throw new Error('Incorrect Credentials');
        }

        const token = await Token.create(user.id);
        res.status(200).json({ "authenticated": true, "token": token.token });
    } catch (err) {
        res.status(401).json({ "error": err.message });
    }
}


async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await User.getOneById(id);
        const changedUser = await user.update(req.body);
        res.status(200).json(changedUser);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await User.getOneById(id);
        await user.destroy()
        res.status(204).send("Successfully deleted");
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

module.exports = {
    index, register, update, destroy, login, showToken, showCount
}