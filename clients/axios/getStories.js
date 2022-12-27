'use strict';
const axios = require('axios');
let url = 'http://localhost:3001/';

module.exports = async (user) => {

  // const { token } = user;
  // const config = {
  //   headers: { Authorization: `Bearer ${token}` },
  // };

  const storiesAll = await axios.get('http://localhost:3001/stories');

  const userStories = storiesAll.data.filter(stories => stories.user === user.id);



  return userStories;
};