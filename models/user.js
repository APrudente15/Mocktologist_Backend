const db = require("../database/connect");


class User {
    constructor ({ user_id, fname, lname, email, password, vegan, image }) {
        this.id = user_id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.vegan = vegan;
        this.image = image;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM userAccount;");
        return response.rows.map(g => new User(g));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT user_id, fname, lname, email, password, vegan, image FROM userAccount WHERE user_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to find user.");
        };
        return new User(response.rows[0]);
    }

    static async create(body) {
        const {fname, lname, email, password, vegan, image} = body;
        const response = await db.query('INSERT INTO userAccount (fname, lname, email, password, vegan, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [fname, lname, email, password, vegan, image]);
    
        return new User(response.rows[0]);
    }

    async update(body) {
        const {fname, lname, email, vegan, image = null} = body;
    
        if (!fname || !lname, !email || (!vegan && vegan !== false)) {
            throw new Error("Missing Data!");
        };
        const response = await db.query('UPDATE userAccount SET fname = $1, lname = $2, email = $3, vegan = $4, image = $5 WHERE user_id = $6 RETURNING *;', [fname, lname, email, vegan, image, this.id]);
        return new User(response.rows[0]);
    }

    static async getOneByEmail(email) {
        const response = await db.query("SELECT user_id, fname, lname, email, password, vegan, image FROM userAccount WHERE email = $1;", [email]);
        if (response.rows.length != 1) {
            throw new Error("Unable to find user.");
        };
        return new User(response.rows[0]);
    }

}

module.exports = User;
