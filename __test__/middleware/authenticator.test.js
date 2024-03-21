const authenticator = require('../../middleware/authenticator');
const Token = require('../../models/token');

jest.mock('../../models/token');

describe('Authenticator Middleware', () => {
  let req, res, next;

  beforeEach(() => {
  req = {
    headers: {
      authorization: 'fakeToken123' 
    }
  };

  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn() 
  };
  next = jest.fn();
});


  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() if token is valid', async () => {
    Token.getOneByToken.mockResolvedValueOnce({});

    await authenticator(req, res, next);

    expect(Token.getOneByToken).toHaveBeenCalledWith('fakeToken123');
    expect(next).toHaveBeenCalled();
  });

  it('should respond with 403 if no token is provided', async () => {
    req.headers.authorization = null;

    await authenticator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "User not authenticated." });
    expect(next).not.toHaveBeenCalled();
  });
});
