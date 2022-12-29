/** @format */

'use strict';
const inquirer = require('inquirer');
let charClass;
let selectedCharacter;
const axios = require('axios');
const unfavorable = require('../../axios/unfavorable');
async function getClass(payload) {
  charClass = payload.toLowerCase();
}
async function getCharacter(payload) {
  selectedCharacter = payload;
}
async function userPlaying(user, socket, character) {
  let res = await respond();
  let [ability, roll] = res;
  socket.emit('ACTION', ability, roll);
}
function diceRoll(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function respond() {
  let spells = await axios.get(
    `https://www.dnd5eapi.co/api/classes/${charClass}/spells`,
  );

  let abilities = spells.data.results.map((item) => item.name);
  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'response',
      choices: abilities,
      message: 'Pick your next action',
    },
  ]);
  let roll = diceRoll(20, 1);

  return [reply.response, roll];
}

async function addSomeBad() {
  return await unfavorable(selectedCharacter, 'bad');
}

module.exports = { userPlaying, getClass, getCharacter, addSomeBad };
