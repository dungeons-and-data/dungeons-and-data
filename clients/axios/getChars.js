'use strict';
const axios = require('axios');
let url = 'http://localhost:3001/';

module.exports = async (user) => {

  const { token } = user;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const charactersAll = await axios.get(`${url}character`, {}, config);

  const userCharacters = charactersAll.data.filter(chars => chars.user === user.id);



  return userCharacters;
};