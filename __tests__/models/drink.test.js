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
        name: "testName",
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

    describe("create", () => {
      it("creates a drink on successful db query", async () => {
        let drinkData = {
          name: "testName",
          tastes: "testTaste",
          done: false,
          vegan: true,
          rating: 10,
          image: "testImg",
        };
        jest
          .spyOn(db, "query")
          .mockResolvedValueOnce({ rows: [{ ...drinkData, id: 1 }] });

        const result = await Drink.create(drinkData);

        expect(result).toBeTruthy();
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("tastes");
        expect(result).toHaveProperty("done");
        expect(result).toHaveProperty("vegan");
        expect(result).toHaveProperty("rating");
        expect(result).toHaveProperty("image");
      });
    });

    describe("destroy", () => {
      it("should delete a drink", async () => {
        const mockDrink = {
          name: "testName",
          tastes: "testTaste",
          done: false,
          vegan: true,
          rating: 10,
          image: "testImg",
        };
        const mockQueryResponse = {
          rows: [mockDrink],
        };
        db.query.mockResolvedValue(mockQueryResponse);

        const drink = new Drink(mockDrink);
        const destroyedDrink = await drink.destroy();

        expect(db.query).toHaveBeenCalledWith(
          "DELETE FROM drink WHERE drink_id = $1 RETURNING *;",
          []
        );
        expect(destroyedDrink).toEqual(new Drink(mockDrink));
      });
    });

    describe("getByUserCurrent", () => {
      it("should retrieve a drink by current user ID", async () => {
        const mockDrink = {
          name: "testName",
          tastes: "testTaste",
          done: false,
          vegan: true,
          rating: 10,
          image: "testImg",
        };
        const mockQueryResponse = {
          rows: [mockDrink],
        };
        db.query.mockResolvedValue(mockQueryResponse);

        const drink = await Drink.getByUserCurrent(1);

        expect(db.query).toHaveBeenCalledWith(
          "SELECT * FROM drink WHERE user_id = $1 AND done = false;",
          [1]
        );
        expect(drink).toEqual(new Drink(mockDrink));
      });
    });

    describe("getByUserCompleted", () => {
      it("should retrieve a completed drink by user ID", async () => {
        const mockDrink = {
          name: "testName",
          tastes: "testTaste",
          done: true,
          vegan: true,
          rating: 10,
          image: "testImg",
        };
        const mockQueryResponse = {
          rows: [mockDrink],
        };
        db.query.mockResolvedValue(mockQueryResponse);

        const drinks = await Drink.getByUserCompleted(1);

        expect(db.query).toHaveBeenCalledWith(
          "SELECT * FROM drink WHERE user_id = $1 AND done = true;",
          [1]
        );
        expect(drinks).toEqual([new Drink(mockDrink)]);
      });
    });

    describe("update", () => {
      it("should return the updated completed drink", async () => {
        const mockDrink = {
          id: 1, // Include the ID of the drink
          name: "testName",
          tastes: "testTaste",
          done: false,
          vegan: true,
          rating: 10,
          image: "testImg",
        };
        const updatedDrinkData = {
          name: "updatedName",
          tastes: "updatedTaste",
          done: true,
          vegan: false,
          rating: 5,
          image: "updatedImg",
        };
        const mockQueryResponse = {
          rows: [{ ...mockDrink, ...updatedDrinkData }],
        };
        db.query.mockResolvedValueOnce(mockQueryResponse);

        const updatedDrink = await Drink.update(mockDrink.id, updatedDrinkData);

        expect(db.query).toHaveBeenCalledWith(
          "UPDATE drink SET name = $1, tastes = $2, done = $3, vegan = $4, rating = $5, image = $6 WHERE drink_id = $7 RETURNING *;",
          [
            updatedDrinkData.name,
            updatedDrinkData.tastes,
            updatedDrinkData.done,
            updatedDrinkData.vegan,
            updatedDrinkData.rating,
            updatedDrinkData.image,
            mockDrink.id,
          ]
        );

        expect(updatedDrink).toEqual({
          ...mockDrink,
          ...updatedDrinkData,
        });
      });
    });
  });
});
