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
      expect(mockJson).toHaveBeenCalledWith(new Drink({...testDrink})
     );
    });
  });

  it("it returns an error with status 404 when unable to create a drink", async () => {
    let testDrink = { name: "Test Drink" };
    const mockReq = { body: testDrink };

    //const errorMessage = "Failed to create a drink";

    jest
      .spyOn(Drink, "create")
      .mockRejectedValue(new Error('Failed to create a drink'));

    await drinksController.create(mockReq, mockRes);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to create a drink' });
  });

//   it("returns an error with status 404 when request body is incomplete", async () => {
//     // let testDrink = { user_id: 7 };
//     const mockReq = { body: { user_id: 7 }};

//     await drinksController.create(mockReq, mockRes);

//     expect(Drink.create).not.toHaveBeenCalled();
//     expect(mockStatus).toHaveBeenCalledWith(404);
//     expect(mockJson).toHaveBeenCalledWith({ error: "Incomplete drink data" });
//   });

