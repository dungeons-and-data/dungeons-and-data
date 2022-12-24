const request = require('supertest');
const { server, connectToMongoDB } = require('../src/server');
const User = require('../models/User');
const mongoose = require('mongoose');

describe('User routes', () => {
  let user;

  beforeAll(async () => {
    await connectToMongoDB();
  });

  beforeAll(async () => {
    user = new User({
      username: 'testuser',
      password: 'password',
      role: 'admin',
    });
    await user.save();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const res = await request(server)
        .post('/signup')
        .send({
          username: 'newuser',
          password: 'password',
          role: 'admin',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'newuser');
      expect(res.body).toHaveProperty('role', 'admin');
    });


    it('should return a 500 error if there is a database validation error', async () => {
      const res = await request(server)
        .post('/signup')
        .send({

          password: 'password',
          role: 'admin',
        });
      expect(res.statusCode).toEqual(500);
      expect(res.body.message).toEqual('Users validation failed: username: Path `username` is required.');
    });

    it('should return a 404 error if the path is not /signup', async () => {
      const res = await request(server)
        .post('/sign')
        .send({
          password: 'password',
          role: 'admin',
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual('Not Found!');
    });
  });

});