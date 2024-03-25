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
    expect(mockJson).toHaveBeenCalledWith({ error: "Failed to create a drink" });
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
      user: 2,
      name: "testDrink",
      body: "testBody",
      tastes: "testTaste",
      done: true,
      vegan: false,
      rating: 3,
      image: "testImage",
    };
    mockReq = { params: { id: 2 } };
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
      user: 2,
      name: "testDrink",
      body: "testBody",
      tastes: "testTaste",
      done: true,
      vegan: false,
      rating: 3,
      image: "testImage",
    };
    mockReq = { params: { id: 3 } };
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
