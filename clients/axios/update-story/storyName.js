/** @format */

'use strict';

const axios = require('axios');
let url = 'https://dungeons-and-data-staging.onrender.com/';

async function storyName(userToken, storyName, story) {
  const { token } = userToken;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { theme, chapter, user, _id } = story;

  const body = {
    storyName,
    theme,
    chapter,
    user,
  };

  await axios.put(`${url}stories/${_id}`, body, config);

  return story;
}
module.exports = storyName;
