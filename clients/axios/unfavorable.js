/** @format */

'use strict';

const axios = require('axios');
let url = 'https://dungeons-and-data-staging.onrender.com/';

module.exports = async function (character, fav) {
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
  if (character?.name) return await axios.put(`${url}character/${_id}`, body);
};
