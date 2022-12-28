/** @format */

'use strict';

const axios = require('axios');
let url = 'http://localhost:3001/';

async function updateNewTheme(userToken, theme, story) {
  const { token } = userToken;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { storyName, chapter, user, _id } = story;

  const body = {
    storyName,
    theme,
    chapter,
    user,
  };

  await axios.put(`${url}stories/${_id}`, body, config);

  return story;
}
module.exports = updateNewTheme;
