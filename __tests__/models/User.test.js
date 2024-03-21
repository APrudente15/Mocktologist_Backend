const User = require("../../models/user");
const db = require("../../database/connect");

// Mock the db object
jest.mock("../../database/connect", () => ({
  query: jest.fn(),
}));

describe("User", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.clearAllMocks());

  describe("getAll", () => {
    it("should return all users available", async () => {
      db.query.mockResolvedValueOnce({
        rows: [
          {
            fname: "u1",
            lname: "u1",
            email: "testEmail1",
            password: "1234",
            vegan: false,
            image: "img1",
          },
          {
            fname: "u2",
            lname: "u2",
            email: "testEmail2",
            password: "1234",
            vegan: false,
            image: "img2",
          },
          {
            fname: "u3",
            lname: "u3",
            email: "testEmail3",
            password: "1234",
            vegan: false,
            image: "img3",
          },
        ],
      });

      const users = await User.getAll();

      expect(users).toHaveLength(3);
      expect(users[0]).toHaveProperty("id");
    });

    it("should throw an Error on db query error", async () => {
      db.query.mockRejectedValueOnce(new Error("Unable to find users."));

      try {
        await User.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe("Unable to find users.");
      }
    });
  });
});
