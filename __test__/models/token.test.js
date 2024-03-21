const { v4: uuidv4 } = require("uuid");
const db = require("../../database/connect");
const Token = require("../../models/token");

jest.mock("uuid");
jest.mock("../../database/connect");

describe("Token", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("create", () => {
        it("should create a new token", async () => {
            const mockToken = {
                token_id: 1,
                user_id: 1,
                token: "mockTokenValue"
            };
            const mockQueryResponse = {
                rows: [mockToken]
            };
            db.query.mockResolvedValue(mockQueryResponse);
            uuidv4.mockReturnValue("mockTokenValue");

            const token = await Token.create(1);

            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO token (user_id, token) VALUES ($1, $2) RETURNING *;",
                [1, "mockTokenValue"]
            );
            expect(token).toEqual(new Token(mockToken));
        });
    });

    describe("getOneByToken", () => {
        it("should retrieve a token by its value", async () => {
            const mockToken = {
                token_id: 1,
                user_id: 1,
                token: "mockTokenValue"
            };
            const mockQueryResponse = {
                rows: [mockToken]
            };
            db.query.mockResolvedValue(mockQueryResponse);

            const token = await Token.getOneByToken("mockTokenValue");

            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM token WHERE token = $1;",
                ["mockTokenValue"]
            );
            expect(token).toEqual(new Token(mockToken));
        });

        it("should throw an error if token is not found", async () => {
            const mockQueryResponse = {
                rows: []
            };
            db.query.mockResolvedValue(mockQueryResponse);

            await expect(Token.getOneByToken("nonexistentToken")).rejects.toThrow(
                "Unable to locate token."
            );
        });
    });

    describe("getOneByUser", () => {
        it("should retrieve a token by user ID", async () => {
            const mockToken = {
                token_id: 1,
                user_id: 1,
                token: "mockTokenValue"
            };
            const mockQueryResponse = {
                rows: [mockToken]
            };
            db.query.mockResolvedValue(mockQueryResponse);

            const token = await Token.getOneByUser(1);

            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM token WHERE user_id = $1 RETURNING *;",
                [1]
            );
            expect(token).toEqual(new Token(mockToken));
        });

        it("should throw an error if token is not found for user", async () => {
            const mockQueryResponse = {
                rows: []
            };
            db.query.mockResolvedValue(mockQueryResponse);

            await expect(Token.getOneByUser(1)).rejects.toThrow(
                "Unable to find token."
            );
        });
    });

    describe("destroy", () => {
        it("should destroy a token", async () => {
            const mockToken = {
                token_id: 1,
                user_id: 1,
                token: "mockTokenValue"
            };
            const mockQueryResponse = {
                rows: [mockToken]
            };
            db.query.mockResolvedValue(mockQueryResponse);

            const token = new Token(mockToken);
            const destroyedToken = await token.destroy();

            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM token WHERE token_id = $1 RETURNING *;",
                [1]
            );
            expect(destroyedToken).toEqual(new Token(mockToken));
        });
    });
});
