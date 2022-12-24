const basicAuth = require('../../middleware/auth/basic');

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

  test('It should call _authError function without a valid authorization header', () => {
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

  test('It should return a user object if the authorization header is valid', async () => {
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



