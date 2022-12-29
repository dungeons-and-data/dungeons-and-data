/** @format */

'use strict';

const axios = require('axios');
let url = 'http://localhost:3001/';

module.exports = async function (character, fav) {
  console.log('inside unfav function');
  let { _id, name, level, user, bad } = character;
  if (fav === 'New game') {
    bad = 0;
  } else if (fav === 'bad') {
    const data = await axios.get(`${url}character/${_id}`);
    bad = data.data.bad;
    ++bad;
  }
  const body = {
    name,
    _id,
    level,
    user,
    bad,
    class: character.class,
  };
  console.log(body, 'BODY');
  if (character?.name) return await axios.put(`${url}character/${_id}`, body);
};
