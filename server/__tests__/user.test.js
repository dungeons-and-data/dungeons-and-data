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
    role: 'dungeon-master',
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
          role: 'dungeon-master',
        });
      expect(res.statusCode).toEqual(200);
      user = res.body;
      expect(res.body).toHaveProperty('username', 'newuser');
      expect(res.body).toHaveProperty('role', 'dungeon-master');
    });


    it('should return a 500 error if there is a database validation error', async () => {
      const res = await request(server)
        .post('/signup')
        .send({

          password: 'password',
          role: 'dungeon-master',
        });
      expect(res.statusCode).toEqual(500);
      expect(res.body.message).toEqual('Users validation failed: username: Path `username` is required.');
    });

    it('should return a 404 error if the path is not /signup', async () => {
      const res = await request(server)
        .post('/sign')
        .send({
          password: 'password',
          role: 'dungeon-master',
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
      .get(`/users/not-a-valid-id`);
    expect(res.statusCode).toEqual(500);
  });

  it('should throw a 500 error if the ID does not exist', async () => {
    const id = user.id.toString();

    const res = await request(server)
      .get(`/users/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'newuser');
  });

  it('should throw a 404 error if the ID does not exist', async () => {


    const res = await request(server)
      .get(`/users/5f5e7c6d8e9f0a1b2c3d4e5f`);
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('Not Found!');
  });
});



describe('PUT /users/:id', () => {
  it('should update a user by their ID', async () => {
    const id = user.id.toString();
    const res = await request(server)
      .put(`/users/${id}`)
      .send({
        username: 'updatedUsername',
        role: 'hero',
      });



    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'updatedUsername');
    expect(res.body).toHaveProperty('role', 'hero');
  });



  it('should return a 404 error if the user does not exist', async () => {
    const res = await request(server)
      .put(`/users/5f5e7c6d8e9f0a1b2c3d4e5f`)
      .send({
        username: 'updatedUsername',
        role: 'hero',
      });
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('Not Found!');
  });
});
describe('DELETE /users/:id', () => {
  it('should delete a user by their ID', async () => {
    const id = user.id.toString();

    const res = await request(server)
      .delete(`/users/${id}`);
    expect(res.statusCode).toEqual(204);
  });

  it('should return a 404 error if the user does not exist', async () => {
    const res = await request(server)
      .delete(`/users/5f5e7c6d8e9f0a1b2c3d4e5f`);
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('Not Found!');
  });
});
