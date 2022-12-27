'use strict';


const request = require('supertest');
const { server, connectToMongoDB } = require('../src/server');
const mongoose = require('mongoose');
const Characters = require('../models/Characters');


beforeAll(async () => {
  await connectToMongoDB();
});

afterAll(async () => {
  await Characters.collection.drop();
  await mongoose.connection.close();
});



describe('POST /character', () => {
  it('should create a new character', async () => {
    const res = await request(server)
      .post('/character')
      .send({
        name: 'newhero',
        class: 'Wizard',
        level: 15,
        user: '63aa6130c5eedb9ec8007a8d',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('newhero');
    expect(res.body.class).toEqual('Wizard');
    expect(res.body.level).toEqual(15);


  });

  let id;

  describe('READ /character', () => {
    it('should grab all characters from the database', async () => {
      const res = await request(server)
        .get('/character');
      console.log(res.body);
      expect(res.body[0].name).toEqual('newhero');
      id = res.body[0]._id.toString();
    });
  });


  describe('READ /character/:id', () => {
    it('should grab one character from the database', async () => {
      const res = await request(server)
        .get(`/character/${id}`);
      console.log(id);
      expect(res.body.name).toEqual('newhero');


    });
  });

  describe('PUT /character/:id', () => {
    it('should update one character from the database', async () => {
      const res = await request(server)
        .put(`/character/${id}`)
        .send({
          name: 'UPDATEDhero',
          class: 'Paladin',
          level: 22,
          user: '63aa6130c5eedb9ec8007a8d',
        });
      console.log(id);
      expect(res.body);
      expect(res.statusCode).toEqual(202);
      expect(res.body.name).toEqual('UPDATEDhero');
      expect(res.body.class).toEqual('Paladin');
      expect(res.body.level).toEqual(22);
    });
  });

  describe('DELETE /user/:id', () => {

    it('should delete a hero by ID', async () => {
      let res = await request(server)
        .delete(`/character/${id}`)
      expect(res.statusCode).toEqual(204);
    });
  });





});


