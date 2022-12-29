'use strict';

const axios = require('axios');
let url = 'http://localhost:3001/';

module.exports = async function (character, fav) {

  let { _id, name, level, user, bad } = character;
  if (fav === 'New game') {
    character.bad = 0
  } else {
    ++bad;
  }
  const body = {
    name,
    _id,
    level,
    user,
    bad,
    class: character.class
  };
  console.log(body)
  if (character?.name) return await axios.put(`${url}character/${_id}`, body);
}