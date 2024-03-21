const { Router } = require('express');
const supertest = require('supertest');
const drinkRouter = require('../../routers/drink');
const drinkController = require('../../controllers/drink');

// Mock the drink controller
jest.mock('../../controllers/drink');

// Create a test app with the drinkRouter
const app = Router();
app.use('/drink', drinkRouter);
const request = supertest(app);

//tests try to ping openai atm
describe('Drink Router', () => {
  it('GET / should call newResponse controller', async () => {
    await request.get('/drink');

    expect(drinkController.newResponse).toHaveBeenCalled();
  });

  it('POST /accept should call create controller', async () => {
    await request.post('/drink/accept');

    expect(drinkController.create).toHaveBeenCalled();
  });
});
