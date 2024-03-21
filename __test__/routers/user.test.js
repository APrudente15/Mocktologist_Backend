const { Router } = require('express');
const supertest = require('supertest');
const userRouter = require('../../routers/user');
const userController = require('../../controllers/user');
const authenticator = require('../../middleware/authenticator');

jest.mock('../../controllers/user');

const app = Router();
app.use('/user', userRouter);

const request = supertest(app);
//The tests keep timming out
describe('User Routers', () => {
  it('GET / should call index controller with authenticator middleware', async () => {
    await request.get('/user');
    expect(authenticator).toHaveBeenCalled();
    expect(userController.index).toHaveBeenCalled();
  });

  it('POST /register should call register controller', async () => {
    await request.post('/user/register');
    expect(userController.register).toHaveBeenCalled();
  });
    //write tests for the 5 other routes
});
