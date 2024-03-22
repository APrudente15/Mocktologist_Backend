const Drink = require("../../models/drink");
const db = require("../../database/connect");

jest.mock("../../database/connect", () => ({
  query: jest.fn(),
}));

describe("Drink", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.clearAllMocks());

  describe("getOneById", () => {
    it("gets one drink on successful db query", async () => {
      let testDrink = {
        // id: 2,
        // user_id: 1,
        name: "testName",
        // response_body: "testBody",
        tastes: "testTaste",
        done: true,
        vegan: true,
        rating: 10,
        image: "testImg",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testDrink] });
      const result = await Drink.getOneById(1);
      expect(result).toEqual(testDrink);
    });
});
});