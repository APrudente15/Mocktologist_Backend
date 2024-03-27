const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Token = require("../../models/token");
const { login } = require("../../controllers/user");

jest.mock("bcrypt");
jest.mock("../../models/user");
jest.mock("../../models/token");

describe("User Controller - Login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully authenticate and return a token", async () => {
    const req = { body: { email: "testemail", password: "testpassword" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockUser = {
      fname: "testfname",
      id: 1,
      email: "testemail",
      password: "$2b$10$KljhOeLYRf6HR/F30EABQO1KHygNhxgls0NY0q6hwGt9NnF7ZQOJK",
    }; // hashed password
    const mockToken = { token: "mockToken" };

    User.getOneByEmail.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(true);
    Token.create.mockResolvedValue(mockToken);

    await login(req, res);

    expect(User.getOneByEmail).toHaveBeenCalledWith(req.body.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      req.body.password,
      mockUser.password
    );
    console.log(mockUser.id);
    expect(Token.create).toHaveBeenCalledWith(mockUser.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      authenticated: true,
      fname: "testfname",
      token: mockToken.token,
      user: 1,
    });
  });

  it("should return error for invalid email or password", async () => {
    const req = { body: { email: "testemail", password: "testpassword" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockUser = {
      fname: "testfname",
      user_id: 1,
      email: "testemail",
      password: "$2b$10$KljhOeLYRf6HR/F30EABQO1KHygNhxgls0NY0q6hwGt9NnF7ZQOJK",
    }; // hashed password

    User.getOneByEmail.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(false);

    await login(req, res);

    expect(User.getOneByEmail).toHaveBeenCalledWith(req.body.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      req.body.password,
      mockUser.password
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Incorrect Credentials" });
  });

  it("should handle missing email or password", async () => {
    const req = { body: { email: "", password: "" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Incorrect Credentials" });
  });

  it("should handle errors", async () => {
    const req = { body: { email: "testemail", password: "testpassword" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockError = new Error("Database query failed");

    User.getOneByEmail.mockRejectedValueOnce(mockError);

    await login(req, res);

    expect(User.getOneByEmail).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
  });
});
