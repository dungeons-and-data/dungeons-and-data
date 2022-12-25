const authenticateToken = require('../../middleware/auth/helpers/authenticateToken');
const request = require('supertest');
const { server, connectToMongoDB } = require('../../src/server');
const Users = require('../../models/User');
const mongoose = require('mongoose');

describe('authenticateToken integration testing', () => {
  let user;
  beforeAll(async () => {
    await connectToMongoDB();
  });

  beforeAll(async () => {
    user = new Users({
      username: 'testuser',
      password: 'password',
      role: 'admin',
    });
    await user.save();
    validToken = user.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return the user if the token is valid', async () => {
    const res = await request(server)
      .post('/login')
      .auth('testuser', 'password');
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual('testuser');
    const result = await authenticateToken(res.body.token);
    expect(result.username).toEqual('testuser');
  });

  it('error', async () => {
    const res = await request(server)
      .post('/login')
      .auth('testuser', 'wrongPassword');
    expect(res.statusCode).toEqual(403);
  });

  it('should throw an error if the token is not a valid JWT', async () => {
    try {
      await authenticateToken('invalid token');
    } catch (e) {
      expect(e.message).toEqual('jwt malformed');
    }
  });


  

});
