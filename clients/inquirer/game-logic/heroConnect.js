/** @format */

'use strict';
let url = 'http://localhost:3001/';
const inquirer = require('inquirer');
const getCharJoinGame = require('../getCharJoinGame');
const getChars = require('../../axios/getChars');
const createChar = require('../../axios/createChar');
const unfavorable = require('../../axios/unfavorable');
const axios = require('axios');
let selectedChar
async function heroConnect(user, rooms) {
  let selectedChar = await getCharJoinGame(user, inquirer, getChars);
  if (selectedChar === 'CREATE CHARACTER') {
    await createChar(user);
    await getCharJoinGame(user, inquirer, getChars);
  } else if (selectedChar === 'BACK') {
    return;
  }

  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'hero',
      message: 'pick a room',
      choices: rooms,
    },
  ]);

  return reply.hero;
}
async function userConnect(room, socket, user) {
  let charName = `${selectedChar.name} has joined the table`;
  await unfavorable(selectedChar, 'New game');
  let neededChar = selectedChar;
  let charClass = selectedChar.class;
  socket.emit('JOIN', room);
  socket.emit('TABLE', charName);
  socket.emit('CLASS', charClass);
  socket.emit('CHARACTER', selectedChar);
  // socket.emit('CHARACTER_END', neededChar)
}

async function checkForBad() {
  let response = await axios.get(`${url}character/${selectedChar._id}`);

  return response;
}

module.exports = { heroConnect, userConnect, checkForBad };
