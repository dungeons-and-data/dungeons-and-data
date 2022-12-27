'use strict';
const getChars = require('../axios/getChars');
const inquirer = require('inquirer');
module.exports = async (user) => {
  let characterByName;
  let characters = await getChars(user);
  if (!characters.length) {
    console.log('No characters found!');
    characters = [];
  } else {
    characterByName = characters.map(char => char.name.toUpperCase());
  }
  const reply = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'chars',
        message: 'Select Character',
        choices: [...characterByName, 'CREATE CHARACTER', 'BACK'],
      },
    ]);
  if (reply.chars === 'BACK') return;
  if (reply.chars === 'CREATE CHARACTER') return reply.chars;
  const selectedData = characters
    .filter(char => char.name.toUpperCase() === reply.chars.toUpperCase());
  return selectedData[0];
};