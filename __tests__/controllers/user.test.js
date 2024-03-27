const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Token = require('../../models/token');
const { login, index, register, showToken, showCount, update, destroy, getShare } = require('../../controllers/user')


jest.mock('bcrypt');
jest.mock('../../models/user');
jest.mock('../../models/token');

describe(('userController'), () => {
    describe('index', () => {
        let mockReq, mockRes;
        beforeEach(() => {
            mockReq = {};
            mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        });

        test('should return a list of users on successful retrieval', async () => {
            const mockUsers = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
            User.getAll.mockResolvedValueOnce(mockUsers);

            await index(mockReq, mockRes);

            expect(User.getAll).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
        });

        test('should handle errors and return a 500 status with error message', async () => {
            const mockError = new Error('Database error');
            User.getAll.mockRejectedValueOnce(mockError);
            await index(mockReq, mockRes);

            expect(User.getAll).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        })
    })

    describe('register', () => {
        let mockReq, mockRes;

        beforeEach(() => {
            mockReq = { body: {} };
            mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        });

        test('should create a new user and return a 201 status code', async () => {
            const mockUserData = { name: 'John Doe', email: 'johndoe@example.com', password: 'password' };
            const mockUser = { name: 'John Doe', email: 'johndoe@example.com' };
            const mockSalt = 'mocksalt';

            Object.assign(mockReq.body, mockUserData);
            bcrypt.genSalt.mockResolvedValueOnce(mockSalt);
            bcrypt.hash.mockResolvedValueOnce('hashedpassword');
            User.create.mockResolvedValueOnce(mockUser);

            await register(mockReq, mockRes);

            expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
            expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, mockSalt);
            expect(User.create).toHaveBeenCalledWith(mockUserData);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(mockUser);
        });

        test('should handle errors and return a 404 status code with error message', async () => {
            const mockError = new Error('Database error');
            User.create.mockRejectedValueOnce(mockError);

            await register(mockReq, mockRes);

            expect(User.create).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        });
    })

    describe('showToken', () => {
        let mockReq, mockRes;

        beforeEach(() => {
            mockReq = { params: {} };
            mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        });

        test('should return the user associated with a valid token', async () => {
            const mockToken = { token: 'validtoken', user: 1 };
            const mockUser = { name: 'John Doe', email: 'johndoe@example.com' };

            mockReq.params.token = mockToken.token;
            Token.getOneByToken.mockResolvedValueOnce(mockToken);
            User.getOneById.mockResolvedValueOnce(mockUser);

            await showToken(mockReq, mockRes);

            expect(Token.getOneByToken).toHaveBeenCalledWith(mockToken.token);
            expect(User.getOneById).toHaveBeenCalledWith(mockToken.user);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockUser);
        });

        test('should handle errors when token is not found', async () => {
            const mockError = new Error('Token not found');
            mockReq.params.token = 'invalidtoken';
            Token.getOneByToken.mockRejectedValueOnce(mockError);

            await showToken(mockReq, mockRes);

            expect(Token.getOneByToken).toHaveBeenCalledWith(mockReq.params.token);
            expect(User.getOneById).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        });

        test('should handle errors when user is not found', async () => {
            const mockToken = { token: 'validtoken', user: 1 };
            mockReq.params.token = mockToken.token;
            Token.getOneByToken.mockResolvedValueOnce(mockToken);
            User.getOneById.mockRejectedValueOnce(new Error('User not found'));

            await showToken(mockReq, mockRes);

            expect(Token.getOneByToken).toHaveBeenCalledWith(mockReq.params.token);
            expect(User.getOneById).toHaveBeenCalledWith(mockToken.user);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
        });
    });

    describe('showCount', () => {
        let mockReq, mockRes;

        beforeEach(() => {
            mockReq = { params: {} };
            mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        });

        test('should return the number of completed drinks for a valid user ID', async () => {
            const mockUserId = 1;
            const mockDrinks = [{ completed: true }, { completed: false }];

            mockReq.params.id = mockUserId;
            Drink.getByUserCompleted.mockResolvedValueOnce(mockDrinks);

            await showCount(mockReq, mockRes);

            expect(Drink.getByUserCompleted).toHaveBeenCalledWith(mockUserId);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(1);
        });

        test('should return 0 if no completed drinks found for a valid user ID', async () => {
            const mockUserId = 1;
            const mockDrinks = [];

            mockReq.params.id = mockUserId;
            Drink.getByUserCompleted.mockResolvedValueOnce(mockDrinks);

            await showCount(mockReq, mockRes);

            expect(Drink.getByUserCompleted).toHaveBeenCalledWith(mockUserId);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(0);
        });

        test('should handle errors and return a 404 status code with error message', async () => {
            const mockError = new Error('Database error');
            const mockUserId = 1;

            mockReq.params.id = mockUserId;
            Drink.getByUserCompleted.mockRejectedValueOnce(mockError);

            await showCount(mockReq, mockRes);

            expect(Drink.getByUserCompleted).toHaveBeenCalledWith(mockUserId);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        });

        test('should handle invalid user ID', async () => {
            mockReq.params.id = 'invalidId';

            await expect(showCount(mockReq, mockRes)).rejects.toThrowError('Invalid user ID');
            expect(Drink.getByUserCompleted).not.toHaveBeenCalled();
        });
    });

    describe('login', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should successfully authenticate and return a token', async () => {
            const req = { body: { email: 'testemail', password: 'testpassword' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const mockUser = { fname: 'testfname', id: 1, email: 'testemail', password: '$2b$10$KljhOeLYRf6HR/F30EABQO1KHygNhxgls0NY0q6hwGt9NnF7ZQOJK' };
            const mockToken = { token: 'mockToken' };

            User.getOneByEmail.mockResolvedValueOnce(mockUser);
            bcrypt.compare.mockResolvedValueOnce(true);
            Token.create.mockResolvedValue(mockToken);

            await login(req, res);

            expect(User.getOneByEmail).toHaveBeenCalledWith(req.body.email);
            expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
            console.log(mockUser.id)
            expect(Token.create).toHaveBeenCalledWith(mockUser.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ authenticated: true, fname: 'testfname', token: mockToken.token, user: 1 });
        });

        it('should return error for invalid email or password', async () => {
            const req = { body: { email: 'testemail', password: 'testpassword' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const mockUser = { fname: 'testfname', user_id: 1, email: 'testemail', password: '$2b$10$KljhOeLYRf6HR/F30EABQO1KHygNhxgls0NY0q6hwGt9NnF7ZQOJK' }; // hashed password

            User.getOneByEmail.mockResolvedValueOnce(mockUser);
            bcrypt.compare.mockResolvedValueOnce(false);

            await login(req, res);

            expect(User.getOneByEmail).toHaveBeenCalledWith(req.body.email);
            expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Incorrect Credentials' });
        });

        it('should handle missing email or password', async () => {
            const req = { body: { email: '', password: '' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Incorrect Credentials' });
        });

        it('should handle errors', async () => {
            const req = { body: { email: 'testemail', password: 'testpassword' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const mockError = new Error('Database query failed');

            User.getOneByEmail.mockRejectedValueOnce(mockError);

            await login(req, res);

            expect(User.getOneByEmail).toHaveBeenCalledWith(req.body.email);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
        });
    })
    describe('update', () => {
        let mockReq, mockRes;

        beforeEach(() => {
            mockReq = { params: { id: 1 }, body: {} };
            mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        });

        test('should update the user and return the updated data', async () => {
            const mockUser = { id: 1, fname: 'John', lname: 'Doe' };
            const mockUpdatedUser = { ...mockUser, fname: 'Jane' };

            User.getOneById.mockResolvedValueOnce(mockUser);
            mockUser.update.mockResolvedValueOnce(mockUpdatedUser);

            await update(mockReq, mockRes);

            expect(User.getOneById).toHaveBeenCalledWith(mockReq.params.id);
            expect(mockUser.update).toHaveBeenCalledWith(mockReq.body);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedUser);
        });

        test('should handle errors and return a 404 status code with error message', async () => {
            const mockError = new Error('User not found');
            mockReq.params.id = 1;

            User.getOneById.mockRejectedValueOnce(mockError);

            await update(mockReq, mockRes);

            expect(User.getOneById).toHaveBeenCalledWith(mockReq.params.id);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        });
    });

    describe('destroy', () => {
        let mockReq, mockRes;

        beforeEach(() => {
            mockReq = { headers: { authorization: 'validtoken' } };
            mockRes = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
        });

        test('should destroy the token associated with the authorization header and return a success message', async () => {
            const mockToken = { destroy: jest.fn().mockResolvedValueOnce() };

            Token.getOneByToken.mockResolvedValueOnce(mockToken);

            await destroy(mockReq, mockRes);

            expect(Token.getOneByToken).toHaveBeenCalledWith(mockReq.headers.authorization);
            expect(mockToken.destroy).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(204); // No content
            expect(mockRes.send).toHaveBeenCalledWith('Successfully deleted');
        });

        test('should handle errors and return a 404 status code with error message', async () => {
            const mockError = new Error('Token not found');
            mockReq.headers.authorization = 'invalidtoken';

            Token.getOneByToken.mockRejectedValueOnce(mockError);

            await destroy(mockReq, mockRes);

            expect(Token.getOneByToken).toHaveBeenCalledWith(mockReq.headers.authorization);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        });
    });
    describe('getShare', () => {
        let mockReq, mockRes;

        beforeEach(() => {
            mockReq = { params: { id: 1 } };
            mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        });

        test('should return the user\'s first name on success', async () => {
            const mockUser = { id: 1, fname: 'John', lname: 'Doe' }; 

            User.getOneById.mockResolvedValueOnce(mockUser);

            await getShare(mockReq, mockRes);

            expect(User.getOneById).toHaveBeenCalledWith(mockReq.params.id); 
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ "fname": mockUser.fname }); 
        });

        test('should handle errors and return a 404 status code with error message', async () => {
            const mockError = new Error('User not found');
            mockReq.params.id = 1;

            User.getOneById.mockRejectedValueOnce(mockError);

            await getShare(mockReq, mockRes);

            expect(User.getOneById).toHaveBeenCalledWith(mockReq.params.id);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        });
    });
})
