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
  const { name, theme, chapter } = storyData;
  const body = {
    name,
    theme,
    chapter,
    user: user.id,
  };

  console.log(body);
  const newChar = await axios.post(`${url}character`, body, config);


  // console.log(newChar.data);


  return;
};