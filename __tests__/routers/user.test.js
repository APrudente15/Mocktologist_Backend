const { Router } = require('express');
const supertest = require('supertest');
const userRouter = require('../../routers/user');
const userController = require('../../controllers/user');
const authenticator = require('../../middleware/authenticator');

jest.mock('../../controllers/user');

const app = Router();
app.use('/user', userRouter);

const request = supertest(app);
//The tests keep timing out



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

  //   //write tests for the 5 other routes

    it('POST /login should login the user', async () => {
      await request.post('/user/login');    
      expect(userController.login).toHaveBeenCalled();
    });

//   it('POST login should login the user and return a token', async () => {
//     const payload = {"email": "Henrie@gmail.com", "password": "Henrie91"};
//     const response = await request(api).post('/login').send(payload);
    
//     expect(response.body.authenticated).toEqual(true);
//     expect(response.body).toHaveProperty('token');
// })

  
});
