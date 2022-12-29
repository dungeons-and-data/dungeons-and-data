const request = require('supertest');
const { server, connectToMongoDB } = require('../../src/server');
const mongoose = require('mongoose');
const Story = require('../../models/Story');

beforeAll(async () => {
  await connectToMongoDB();
});

afterAll(async () => {
  await Story.collection.drop();
  await mongoose.connection.close();
});

let id;


describe('POST /stories', () => {
  it('should create a new Story', async () => {
    const res = await request(server)
      .post('/stories')
      .send({
        storyName: 'My Story',
        theme: 'castle',
        chapter: {
          chapterName: 'nombre',
          description: 'description',
          scenarios: 'scenarios',
        },
      });
    id = res.body._id;
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.storyName).toEqual('My Story');
    expect(res.body.theme).toEqual('castle');
    expect(res.body.chapter[0].chapterName).toEqual('nombre');
    expect(res.body.chapter[0].description).toEqual('description');
    expect(res.body.chapter[0].scenarios[0]).toEqual('scenarios');

  });


  describe('READ /stories', () => {
    it('should grab all stories from the database', async () => {
      const res = await request(server)
        .get('/stories');
      console.log(res.body);
      expect(res.body[0].storyName).toEqual('My Story');
      expect(res.body[0].theme).toEqual('castle');
      expect(res.body[0].chapter[0].chapterName).toEqual('nombre');
      expect(res.body[0].chapter[0].description).toEqual('description');
      expect(res.body[0].chapter[0].scenarios[0]).toEqual('scenarios');
    });
  });

  describe('READ /stories/:id', () => {
    it('should grab one story from the database', async () => {
      const res = await request(server)
        .get(`/stories/${id}`);
      console.log(res.body);
      expect(res.body.storyName).toEqual('My Story');
      expect(res.body.theme).toEqual('castle');
      expect(res.body.chapter[0].chapterName).toEqual('nombre');
      expect(res.body.chapter[0].description).toEqual('description');
      expect(res.body.chapter[0].scenarios[0]).toEqual('scenarios');
    });
  });

  describe('PUT /stories/:id', () => {
    it('should update one story from the database', async () => {
      const res = await request(server)
        .put(`/stories/${id}`)
        .send({
          storyName: 'My New Story',
          theme: 'forest',
          chapter: {
            chapterName: 'nuevo nombre',
            description: 'new description',
            scenarios: 'new scenarios',
          },
        });
      console.log(res.body);
      expect(res.statusCode).toEqual(202);
      expect(res.body.storyName).toEqual('My New Story');
      expect(res.body.theme).toEqual('forest');
      expect(res.body.chapter[0].chapterName).toEqual('nuevo nombre');
      expect(res.body.chapter[0].description).toEqual('new description');
      expect(res.body.chapter[0].scenarios[0]).toEqual('new scenarios');

    });
  });
  describe('DELETE /user/:id', () => {

    it('should delete a story by ID', async () => {
      let res = await request(server)
        .delete(`/stories/${id}`);
      expect(res.statusCode).toEqual(204);




    });
  });
  describe('ERROR HANDLER TESTS /stories', () => {
    it('should fail if it doesn\'t exist', async () => {
      const res0 = await request(server)
        .post('/stories');
      const res1 = await request(server)
        .get(`/stories/${id}`);
      const res2 = await request(server)
        .get('/stories');
      const res3 = await request(server)
        .put(`/stories/${id}`);
      const res4 = await request(server)
        .delete(`/stories/${id}`);
      expect(res0.status).toEqual(500);
      expect(res1.status).toEqual(404);
      expect(res2.status).toEqual(404);
      expect(res3.status).toEqual(404);
      expect(res4.status).toEqual(404);
    });
  });
});


