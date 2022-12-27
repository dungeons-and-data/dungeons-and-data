'use strict';
const getChars = require('../axiosFN/getChars');
const inquirer = require('inquirer');
module.exports = async (user) => {
  const characters = getChars(user);
  const reply = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'chars',
        message: 'Select Character',
        choices: [...characters, 'CREATE CHARACTER', 'BACK'],
      },
    ]);

};