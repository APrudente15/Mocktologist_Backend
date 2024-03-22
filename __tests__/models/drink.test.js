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
                id: 1, 
                user_id: 1,
                name: "testName",
                response_body: "testBody",
                tastes: "testTaste",
                done: false,
                vegan: true,
                rating: 10,
                image: "testImg"
            };
      
            
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testDrink] });
      
           
            const result = await Drink.getOneById(1);

            console.log("Expected: ", testDrink);
            console.log("Received: ", result);
      
            
            expect(result).toEqual(testDrink);
        });

    //     describe('create', () => {
    //         it('creates a drink on successful db query', async () => {
    //           let drinkData = {       
    //             user_id: 1,
    //             name: "testName",
    //             response_body: "testBody",
    //             tastes: "testTaste",
    //             done: false,
    //             vegan: true,
    //             rating: 10,
    //             image: "testImg"}
    //           jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({ rows: [{ ...drinkData, id: 1 }] });
          
    //           const result = await Drink.create(drinkData);
              
    //           expect(result).toBeTruthy()
    //           expect(result).toHaveProperty('user_id')
    //           expect(result).toHaveProperty('name')
    //           expect(result).toHaveProperty('response_body')
    //           expect(result).toHaveProperty('tastes')
    //           expect(result).toHaveProperty('done')
    //           expect(result).toHaveProperty('vegan')
    //           expect(result).toHaveProperty('rating')
    //           expect(result).toHaveProperty('image')
    //         });
    // }); 


    describe("create", () => {
        it("should create a new drink", async () => {
            const mockDrink = {
                user_id: 1,
                name: "testName",
                response_body: "testBody",
                tastes: "testTaste",
                done: false,
                vegan: true,
                rating: 10,
                image: "testImg"}

            const mockQueryResponse = {
                rows: [mockDrink]
            };
            db.query.mockResolvedValue(mockQueryResponse);
         

            const drink= await Drink.create(1);

            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO drink (user_id, name, response_body, tastes, done, vegan, rating, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
                [1, "mockDrinkValue"]
            );
            expect(drink).toEqual(new Drink(mockDrink));
        });
    });
})
});
