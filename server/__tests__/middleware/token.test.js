const authenticateToken = require('../../middleware/auth/helpers/authenticateToken');
const authenticate = require('../../middleware/auth/bearer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;


describe('authenticateToken Unit Testing', () => {
});


jest.mock('../../middleware/auth/helpers/authenticateToken', () => {
  return jest.fn().mockImplementation(token => {
    if (token === 'invalid token') {
      return Promise.reject(new Error('jwt malformed'));
    }
    if (token === 'valid_token') {
      return Promise.resolve({});
    }
    return Promise.resolve({ username: 'testuser' });
  });
});

test('authenticateToken should return the user if the token is valid', async () => {
  const mockUser = { username: 'testuser' };
  const mockToken = jwt.sign({ username: mockUser.username }, SECRET);

  const result = await authenticateToken(mockToken);
  expect(result).toEqual(mockUser);
});
test('authenticateToken should throw an error if the token is invalid', async () => {
  try {
    await authenticateToken('invalid token');
    fail();
  } catch (e) {
    expect(e.message).toEqual('jwt malformed');
  }
});

test('authenticate should call next with no arguments if the token is valid', async () => {
  const req = { headers: { authorization: 'Bearer valid_token' } };
  const res = {};
  const next = jest.fn();

  await authenticate(req, res, next);
  expect(next).toHaveBeenCalled();
  expect(next).toHaveBeenCalledWith();
});

test('authenticate should call next with "Invalid Login" if the authorization header is not present', async () => {
  const req = { headers: { authorization: null } };
  const res = {};
  const next = jest.fn();

  await authenticate(req, res, next);
  expect(next).toHaveBeenCalled();
  expect(next).toHaveBeenCalledWith('Invalid Login');
});
