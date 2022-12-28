'use strict';
const axios = require('axios');

module.exports = async (user) => {

  const storiesAll = await axios.get('http://localhost:3001/stories');

  const userStories = storiesAll.data.filter(stories => stories.user === user.id);

  return userStories;
};