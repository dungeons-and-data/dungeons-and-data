const request = require('supertest');
const { server, connectToMongoDB } = require('../src/server');
const User = require('../models/User');
const mongoose = require('mongoose');


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

describe('User routes', () => {




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
      user = res.body;
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

  describe('POST /login', () => {
    it('should log in a user with the correct username and password', async () => {
      const res = await request(server)
        .post('/login')
        .auth('testuser', 'password');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'testuser');
    });

    it('should return a 401 error if the password is incorrect', async () => {
      const res = await request(server)
        .post('/login')
        .auth('testuser', 'incorrectpassword');
      expect(res.statusCode).toEqual(403);
      expect(res.text).toEqual('Invalid Login');
    });

    it('should return a 401 error if the username does not exist', async () => {
      const res = await request(server)
        .post('/login')
        .auth('nonexistentuser', 'password');
      expect(res.statusCode).toEqual(403);
      expect(res.text).toEqual('Invalid Login');
    });
  });

});

describe('GET /users', () => {
  it('should return a list of all users', async () => {
    const res = await request(server)
      .get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('username', 'testuser');
  });

});


describe('GET /users/:id', () => {
  it('should throw a 500 error if the ID does not exist', async () => {
    const res = await request(server)
      .get(`/users/123123`);
    expect(res.statusCode).toEqual(500);
  });

  it('should throw a 500 error if the ID does not exist', async () => {
    const id = user.id.toString();

    const res = await request(server)
      .get(`/users/${id}`);
    console.log(res)
    expect(res.statusCode).toEqual(200);
  });
});

