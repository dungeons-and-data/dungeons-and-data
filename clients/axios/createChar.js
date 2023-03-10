/** @format */

'use strict';
const axios = require('axios');
let url = 'https://dungeons-and-data-staging.up.railway.app/';
const createCharInq = require('../inquirer/createCharInq');
module.exports = async (user) => {
  const { token } = user;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // ()sdfsdfsdfsdf
  const charData = await createCharInq();
  const { name, profession } = charData;
  const body = {
    name: name,
    class: profession,
    user: user.id,
  };
  const newChar = await axios.post(`${url}character`, body, config);

  console.log(newChar.data);

  return;
};
