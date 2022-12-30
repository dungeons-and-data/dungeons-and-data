'use strict';
const axios = require('axios');

module.exports = async (user) => {

  const storiesAll = await axios.get('https://dungeons-and-data-staging.onrender.com/stories');

  const userStories = storiesAll.data.filter(stories => stories.user === user.id);

  return userStories;
};