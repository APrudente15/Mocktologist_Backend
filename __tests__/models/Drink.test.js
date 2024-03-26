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

    describe("complete", () => {
      it("should return the updated completed drink", async () => {
        const drink = new Drink({
          name: "testName",
          tastes: "testTaste",
          done: false,
          vegan: true,
          rating: 10,
          image: "testImg",
        });
        jest.spyOn(db, "query").mockResolvedValueOnce({
          rows: [
            {
              name: "testName",
              tastes: "testTaste",
              done: true,
              vegan: true,
              rating: 10,
              image: "testImg",
            },
          ],
        });

        const result = await drink.complete({
          name: "testName",
          tastes: "testTaste",
          done: true,
          vegan: true,
          rating: 10,
          image: "testImg",
        });

        expect(result).toBeInstanceOf(Drink);
        expect(result.name).toBe("testName");
        expect(result.tastes).toBe("testTaste");
        expect(result.done).toBe(true);
        expect(result.vegan).toBe(true);
        expect(result.rating).toBe(10);
        expect(result.image).toBe("testImg");
        expect(result).not.toEqual(drink);
      });
    });

    describe("updateRating", () => {
      it("should return the updated drink rating", async () => {
        const drink = new Drink({
          name: "testName",
          tastes: "testTaste",
          done: false,
          vegan: true,
          rating: 10,
          image: "testImg",
        });
        jest.spyOn(db, "query").mockResolvedValueOnce({
          rows: [
            {
              name: "testName",
              tastes: "testTaste",
              done: true,
              vegan: true,
              rating: 8,
              image: "testImg",
            },
          ],
        });

        const result = await drink.updateRating({
          name: "testName",
          tastes: "testTaste",
          done: true,
          vegan: true,
          rating: 8,
          image: "testImg",
        });

        expect(result).toBeInstanceOf(Drink);
        expect(result.name).toBe("testName");
        expect(result.tastes).toBe("testTaste");
        expect(result.done).toBe(true);
        expect(result.vegan).toBe(true);
        expect(result.rating).toBe(8);
        expect(result.image).toBe("testImg");
        expect(result).not.toEqual(drink);
      });
    });

    describe("updatePicture", () => {
      it("should return the updated image of the drink", async () => {
        const drink = new Drink({
          name: "testName",
          tastes: "testTaste",
          done: false,
          vegan: true,
          rating: 10,
          image: "testImg",
        });
        jest.spyOn(db, "query").mockResolvedValueOnce({
          rows: [
            {
              name: "testName",
              tastes: "testTaste",
              done: true,
              vegan: true,
              rating: 10,
              image: "updatedTestImg",
            },
          ],
        });

        const result = await drink.updatePicture({
          name: "testName",
          tastes: "testTaste",
          done: true,
          vegan: true,
          rating: 10,
          image: "updatedTestImg",
        });

        expect(result).toBeInstanceOf(Drink);
        expect(result.name).toBe("testName");
        expect(result.tastes).toBe("testTaste");
        expect(result.done).toBe(true);
        expect(result.vegan).toBe(true);
        expect(result.rating).toBe(10);
        expect(result.image).toBe("updatedTestImg");
        expect(result).not.toEqual(drink);
      });
    });
    describe("getTopByUser", () => {
      it("should retrieve the top-rated drinks by user ID", async () => {
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

        const drinks = await Drink.getTopByUser(1);

        expect(db.query).toHaveBeenCalledWith(
          "SELECT * FROM drink WHERE user_id = $1 AND rating < 11 ORDER BY rating DESC LIMIT 3;",
          [1]
        );
        expect(drinks).toEqual([new Drink(mockDrink)]);
      });
    });
    
  });
});
