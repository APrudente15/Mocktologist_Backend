const db = require("../database/connect");

class Drink {
    constructor ({ drink_id, user_id, name, response_body, tastes, done, vegan, rating, image }) {
        this.id = drink_id;
        this.user = user_id;
        this.name = name;
        this.body = response_body;
        this.tastes = tastes;
        this.done = done;
        this.vegan = vegan;
        this.rating = rating;
        this.image = image;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM drink WHERE drink_id = $1;", [id]);
        if(response.rows.length != 1) {
            throw new Error("Unable to find drink.");
        };
        return new Drink(response.rows[0]);
    }

    static async create(data) {
        const { user, name, body, tastes, done, vegan, rating = null, image = null } = data;
        const response = await db.query('INSERT INTO drink (user_id, name, response_body, tastes, done, vegan, rating, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;', [user, name, body, tastes, done, vegan, rating, image]);

        return new Drink(response.rows[0]);
    }

    static async getByUserCompleted(user) {
        const response = await db.query("SELECT * FROM drink WHERE user_id = $1 AND done = true;", [user]);
        if(response.rows.length == 0) {
            throw new Error("Unable to find drinks.");
        };
        return response.rows.map(g => new Drink(g));
    }

    static async getByUserCurrent(user) {
        const response = await db.query("SELECT * FROM drink WHERE user_id = $1 AND done = false;", [user]);
        if(response.rows.length != 1) {
            throw new Error("Unable to find drink.");
        };
        return new Drink(response.rows[0]);
    }

    async complete() {
        const response = await db.query("UPDATE drink SET done = true WHERE drink_id = $1 RETURNING *;", [this.id]);
        return new Drink(response.rows[0]);
    }

    async destroy() {
        const response = await db.query("DELETE FROM drink WHERE drink_id = $1 RETURNING *;", [this.id]);
        return new Drink(response.rows[0]);
    }

    async updateRating(data) {
        const {rating} = data;
        if(!rating) {
            throw new Error("Missing Data!");
        };
        const response = await db.query("UPDATE drink SET rating = $1 WHERE drink_id = $2 RETURNING *;", [rating, this.id]);
        return new Drink(response.rows[0]);
    }

    async updatePicture(data) {
        const {picture} = data;
        if(!picture) {
            throw new Error("Missing Data!");
        };
        const response = await db.query("UPDATE drink SET picture = $1 WHERE drink_id = $2 RETURNING *;", [picture, this.id]);
        return new Drink(response.rows[0]);
    }

    static async getTopByUser(user) {
        const response = await db.query("SELECT * FROM drink WHERE user_id = $1 ORDER BY rating DESC LIMIT 3;", [user]);
        if(response.rows.length == 0 || response.rows.length > 3) {
            throw new Error("Unable to find drink.");
        };
        return response.rows.map(g => new Drink(g));
    }
}

module.exports = Drink;