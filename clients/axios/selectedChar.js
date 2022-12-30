/** @format */

'use strict';
const axios = require('axios');
let url = 'https://dungeons-and-data-staging.up.railway.app/';
const selectedCharInq = require('../inquirer/selectedCharInq');
const characterList = require('../inquirer/characterList');
const inquirer = require('inquirer');
const getChars = require('./getChars');
module.exports = async (character, user) => {
  const { token } = user;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const userChoice = await selectedCharInq(character);

  if (userChoice[0] === 'back') {
    return;
  } else if (userChoice[0] === 'nameChange') {
    const body = {
      name: userChoice[1],
      class: character.class,
      level: character.level,
      user: character.user,
    };
    await axios.put(`${url}character/${character._id}`, body, config);
  } else if (userChoice[0] === 'classChange') {
    const body = {
      name: character.name,
      class: userChoice[1],
      level: character.level,
      user: character.user,
    };
    await axios.put(`${url}character/${character._id}`, body, config);
  } else if (userChoice[0] === 'delete') {
    await axios.delete(`${url}character/${character._id}`, {}, config);
  }

  return characterList(user, inquirer, getChars);
};
