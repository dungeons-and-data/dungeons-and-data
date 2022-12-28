'use strict';
const axios = require('axios');
let url = 'http://localhost:3001/';
const createStoryInq = require('../inquirer/createStoryInq');
module.exports = async (user) => {

  const { token } = user;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const storyData = await createStoryInq();
  const { storyName, theme, chapter } = storyData;
  const lowerTheme = theme.toLowerCase();
  const body = {
    storyName: storyName,
    lowerTheme,
    chapter,
    user: user.id,
  };


  const story = await axios.post(`${url}stories`, body, config);




  return story;
};