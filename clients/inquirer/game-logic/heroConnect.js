/** @format */

'use strict';
let url = 'http://localhost:3001/';
const inquirer = require('inquirer');
const characterList = require('../characterList');
const getChars = require('../../axios/getChars');
const createChar = require('../../axios/createChar');
const unfavorable = require('../../axios/unfavorable');
const axios = require('axios');
let selectedChar;
async function heroConnect(user, rooms) {
  console.log('running inq');
  selectedChar = await characterList(user, inquirer, getChars);
  if (selectedChar === 'CREATE CHARACTER') {
    await createChar(user);
    selectedChar = await characterList(user, inquirer, getChars);
  } else if (selectedChar === 'BACK') {
    return;
  }
  // console.log(selectedChar);

  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'hero',
      message: 'pick a room',
      choices: rooms,
    },
  ]);
  console.log();
  return reply.hero;
}
async function userConnect(room, socket, user) {
  let charName = `${selectedChar.name} has joined the table`;
  await unfavorable(selectedChar, 'New game');

  let charClass = selectedChar.class;
  socket.emit('JOIN', room);
  socket.emit('TABLE', charName);
  socket.emit('CLASS', charClass);
  socket.emit('CHARACTER', selectedChar);
}

async function checkForBad() {
  let response = axios.get(`${url}character/${selectedChar._id}`);

  return response;
}

module.exports = { heroConnect, userConnect, checkForBad };
