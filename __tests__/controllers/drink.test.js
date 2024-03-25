const drinksController = require("../../controllers/drink");
const Drink = require("../../models/drink");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));

const mockRes = { status: mockStatus };

describe("drinks controller ", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("create", () => {
    it("it returns a new drink with a 201 status code", async () => {
      let testDrink = {
        user: 1,
        name: "testDrink",
        body: "testBody",
        tastes: "testTaste",
        done: true,
        vegan: false,
        rating: 3,
        image: "testImage",
      };
      const mockReq = { body: testDrink };

      jest.spyOn(Drink, "create").mockResolvedValue(new Drink(testDrink));

      await drinksController.create(mockReq, mockRes);

      expect(Drink.create).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Drink({ ...testDrink }));
    });
    it("it returns an error with status 404 when unable to create a drink", async () => {
      let testDrink = { name: "Test Drink" };
      const mockReq = { body: testDrink };

      jest
        .spyOn(Drink, "create")
        .mockRejectedValue(new Error("Failed to create a drink"));

      await drinksController.create(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Failed to create a drink",
      });
    });
  });

  //   it("returns an error with status 404 when request body is incomplete", async () => {
  //     // let testDrink = { user_id: 7 };
  //     const mockReq = { body: { user_id: 7 }};

  //     await drinksController.create(mockReq, mockRes);

  //     expect(Drink.create).not.toHaveBeenCalled();
  //     expect(mockStatus).toHaveBeenCalledWith(404);
  //     expect(mockJson).toHaveBeenCalledWith({ error: "Incomplete drink data" });
  //   });

  describe("showCompleted", () => {
    let testDrink, mockReq;
    beforeEach(() => {
      testDrink = {
        user: 1,
        name: "testDrink",
        body: "testBody",
        tastes: "testTaste",
        done: true,
        vegan: false,
        rating: 3,
        image: "testImage",
      };
      mockReq = { params: { id: 1 } };
    });

    it("return a drink with a 200 status code", async () => {
      jest
        .spyOn(Drink, "getByUserCompleted")
        .mockResolvedValue(new Drink(testDrink));

      await drinksController.showCompleted(mockReq, mockRes);

      expect(Drink.getByUserCompleted).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new Drink(testDrink));
    });

    it("sends an error upon fail", async () => {
      jest
        .spyOn(Drink, "getByUserCompleted")
        .mockRejectedValue(new Error("Cannot find drink"));

      await drinksController.showCompleted(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Cannot find drink" });
    });
  });

  describe("showCurrent", () => {
    let testDrink, mockReq;
    beforeEach(() => {
      testDrink = {
        user: 1,
        name: "testDrink",
        body: "testBody",
        tastes: "testTaste",
        done: true,
        vegan: false,
        rating: 3,
        image: "testImage",
      };
      mockReq = { params: { id: 1 } };
    });

    it("return a drink with a 200 status code", async () => {
      jest
        .spyOn(Drink, "getByUserCurrent")
        .mockResolvedValue(new Drink(testDrink));

      await drinksController.showCurrent(mockReq, mockRes);

      expect(Drink.getByUserCurrent).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new Drink(testDrink));
    });

    it("sends an error upon fail", async () => {
      jest
        .spyOn(Drink, "getByUserCurrent")
        .mockRejectedValue(new Error("Cannot find drink"));

      await drinksController.showCurrent(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Cannot find drink" });
    });
  });

  describe("completeCurrent", () => {
    let testDrink, mockReq;
    beforeEach(() => {
      testDrink = {
        user: 1,
        name: "testDrink",
        body: "testBody",
        tastes: "testTaste",
        done: true,
        vegan: false,
        rating: 3,
        image: "testImage",
      };
      mockReq = { params: { id: 1 } };
    });

    it("return a drink with a 200 status code", async () => {
      jest
        .spyOn(Drink, "getByUserCurrent")
        .mockResolvedValue(new Drink(testDrink));

      await drinksController.completeCurrent(mockReq, mockRes);

      expect(Drink.getByUserCurrent).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new Drink(testDrink));
    });

    it("sends an error upon fail", async () => {
      jest
        .spyOn(Drink, "getByUserCurrent")
        .mockRejectedValue(new Error("Cannot find drink"));

      await drinksController.completeCurrent(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Cannot find drink" });
    });
  });

  // write tests for destroy, updateRating and updatePicture

  describe("destroy", () => {
    it("returns a 204 status code on successful deletion", async () => {
      const testDrink = {
        id: 4,
        user: 4,
        name: "testDrink",
        body: "testBody",
        tastes: "testTaste",
        done: true,
        vegan: false,
        rating: 5,
        image: "testImage",
      };
      jest.spyOn(Drink, "getOneById").mockResolvedValue(new Drink(testDrink));

      jest
        .spyOn(Drink.prototype, "destroy")
        .mockResolvedValue(new Drink(testDrink));

      const mockReq = { params: { id: 4 } };

      await drinksController.destroy(mockReq, mockRes);

      expect(Drink.getOneById).toHaveBeenCalledTimes(1);
      expect(Drink.prototype.destroy).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(204);
      expect(mockEnd).toHaveBeenCalledWith();
    });

    it("calls drink.destroy()", async () => {
      const mockReq = { params: { id: 37 } };

      jest
        .spyOn(Drink, "getOneById")
        .mockRejectedValue(new Error("drink not found"));

      await drinksController.destroy(mockReq, mockRes);

      expect(Drink.getOneById).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockSend).toHaveBeenCalledWith({ error: "drink not found" });
    });
  });

  describe("updateRating", () => {
    it("modifies the rating in the drinks database", async () => {
      const testDrink = {
        id: 22,
        name: "testDrink",
        tastes: "testTaste",
        done: true,
        vegan: false,
        rating: 3,
        image: "testImage",
      };
      jest.spyOn(Drink, "getOneById").mockResolvedValue(new Drink(testDrink));

      const mockReq = {
        params: { id: 22 },
        body: {
          name: "testDrink",
          tastes: "testTaste",
          done: true,
          vegan: false,
          rating: 7,
          image: "testImage",
        },
      };

      jest.spyOn(Drink.prototype, "updateRating").mockResolvedValue({
        ...new Drink(testDrink),
        name: "testDrink",
        tastes: "testTaste",
        done: true,
        vegan: false,
        rating: 7,
        image: "testImage",
      });

      await drinksController.updateRating(mockReq, mockRes);

      expect(Drink.getOneById).toHaveBeenCalledTimes(1);
      expect(Drink.prototype.updateRating).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(
        new Drink({
          id: 22,
          name: "testDrink",
          tastes: "testTaste",
          done: true,
          vegan: false,
          rating: 7,
          image: "testImage",
        })
      );
    });

    it("calls drink.updateRating()", async () => {
      const mockReq = { params: { id: 37 } };

      jest
        .spyOn(Drink, "getOneById")
        .mockRejectedValue(new Error("drink not found"));

      await drinksController.updateRating(mockReq, mockRes);

      expect(Drink.getOneById).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        error: "drink not found",
      });
    });
  });

  describe("updatePicture", () => {
    it("modifies the picture row in the drinks database", async () => {
      const testDrink = {
        id: 22,
        name: "testDrink",
        tastes: "testTaste",
        done: true,
        vegan: false,
        rating: 3,
        image: "testImage",
      };
      jest.spyOn(Drink, "getOneById").mockResolvedValue(new Drink(testDrink));

      const mockReq = {
        params: { id: 22 },
        body: {
          name: "testDrink",
          tastes: "testTaste",
          done: true,
          vegan: false,
          rating: 3,
          image: "testNewImage",
        },
      };

      jest.spyOn(Drink.prototype, "updatePicture").mockResolvedValue({
        ...new Drink(testDrink),
        name: "testDrink",
        tastes: "testTaste",
        done: true,
        vegan: false,
        rating: 7,
        image: "testNewImage",
      });

      await drinksController.updatePicture(mockReq, mockRes);

      expect(Drink.getOneById).toHaveBeenCalledTimes(1);
      expect(Drink.prototype.updatePicture).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(
        new Drink({
          id: 22,
          name: "testDrink",
          tastes: "testTaste",
          done: true,
          vegan: false,
          rating: 7,
          image: "testNewImage",
        })
      );
    });

    it("calls drink.updatePicture()", async () => {
      const mockReq = { params: { id: 37 } };

      jest
        .spyOn(Drink, "getOneById")
        .mockRejectedValue(new Error("drink not found"));

      await drinksController.updatePicture(mockReq, mockRes);

      expect(Drink.getOneById).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        error: "drink not found",
      });
    });
  });

  describe("getTop3", () => {
    let testTop3, mockReq;
    beforeEach(() => {
      testDrink = {
        rows: [
          {
            user: 1,
            name: "testDrink1",
            body: "testBody1",
            tastes: "testTaste1",
            done: true,
            vegan: true,
            rating: 10,
            image: "testImage1",
          },
          {
            user: 2,
            name: "testDrink2",
            body: "testBody2",
            tastes: "testTaste2",
            done: true,
            vegan: false,
            rating: 9,
            image: "testImage2",
          },
          {
            user: 3,
            name: "testDrink3",
            body: "testBody3",
            tastes: "testTaste3",
            done: true,
            vegan: true,
            rating: 10,
            image: "testImage3",
          },
        ],
      };
      mockReq = { params: { id: 1 } };
    });

    it("return top three drinks with a 200 status code", async () => {
      jest.spyOn(Drink, "getTopByUser").mockResolvedValue(new Drink(testTop3));

      await drinksController.getTop3(mockReq, mockRes);

      expect(Drink.getTopByUser).toHaveBeenCalledTimes(1);
      expect(Drink.getTopByUser).toHaveLength(3);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new Drink(testTop3));
    });

    it("sends an error upon fail", async () => {
      jest
        .spyOn(Drink, "getTopByUser")
        .mockRejectedValue(new Error("Cannot find drinks"));

      await drinksController.getTop3(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Cannot find drinks" });
    });
  });
});
