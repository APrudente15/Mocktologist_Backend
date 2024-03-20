const { v4: uuidv4 } = require("uuid");

const db = require("../database/connect");

class Token {
    constructor({ token_id, user_id, token }) {
        this.token_id = token_id;
        this.user = user_id;
        this.token = token;
    }

    static async create(user_id) {
        const token = uuidv4();
        let response = await db.query("INSERT INTO token (user_id, token) VALUES ($1, $2) RETURNING *;", [user_id, token]);

        return new Token(response.rows[0]);
    }

    static async getOneByToken(token) {
        const response = await db.query("SELECT * FROM token WHERE token = $1;", [token]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        }
        return new Token(response.rows[0]);
    }

     static async getOneByUser(user) {
        const response = await db.query("SELECT * FROM token WHERE user_id = $1 RETURNING *;", [user]);
        if(response.rows.length != 1) {
            throw new Error("Unable to find token.");
        };
        return new Token(response.rows[0]);
    }

    async destroy() {
        const response = await db.query("DELETE FROM token WHERE token_id = $1 RETURNING *;", [this.token_id]);
        return new Token(response.rows[0]);
    }
}

module.exports = Token;