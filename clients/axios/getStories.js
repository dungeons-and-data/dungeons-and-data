/** @format */

'use strict';
const axios = require('axios');

module.exports = async (user) => {
  const storiesAll = await axios.get(
    'https://dungeons-and-data-staging.up.railway.app/stories',
  );

  const userStories = storiesAll.data.filter(
    (stories) => stories.user === user.id,
  );

  return userStories;
};
