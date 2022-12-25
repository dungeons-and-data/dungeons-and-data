
const authenticate = require('../../middleware/auth/bearer');




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




