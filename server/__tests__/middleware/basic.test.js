const basicAuth = require('../../middleware/auth/basic');

jest.mock('../../models/User', () => {
  return {
    findOne: jest.fn().mockImplementation((query) => {
      if (query.username === 'invalid') {
        return null;
      }
      return {
        username: 'valid',
        password: 'hashedpassword',
      };
    }),
  };
});


jest.mock('bcrypt', () => {
  return {
    compare: jest.fn().mockImplementation((password, hashedPassword) => {
      if (password === 'validpassword' && hashedPassword === 'hashedpassword') {
        return true;
      }
      return false;
    }),
  };
});


jest.mock('../../middleware/auth/helpers/authenticateBasic', () => jest.fn().mockResolvedValue({ id: 123 }));

describe('Unit Testing for basic authorization middleware', () => {
  const mockSend = jest.fn().mockResolvedValueOnce({});

  jest.mock('express', () => ({
    response: jest.fn(() => ({
      status: jest.fn(() => ({
        send: mockSend,
      })),
    })),
  }));

  it('Should call _authError function without a valid authorization header', () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn(() => ({
        send: mockSend,
      })),
    };
    const next = jest.fn();

    basicAuth(req, res, next);

    expect(mockSend).toHaveBeenCalledWith('Invalid Login');
  });

  it('Should return a user object if the authorization header is valid', async () => {
    const req = {
      headers: {
        authorization: 'Basic dXNlcjpwYXNz',
      },
    };
    const res = {};
    const next = jest.fn();

    await basicAuth(req, res, next);

    expect(req.user).toEqual({ id: 123 });
    expect(next).toHaveBeenCalled();
  });
});





