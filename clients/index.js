'use strict';
const loginChoice = require('./axios/login');
require('dotenv').config();
const { mainMenu, menuChoice } = require('./inquirer/mainMenu');

const start = async () => {
  const user = await loginChoice();
  const menuRes = await mainMenu(user);
  const mainChoice = await menuChoice(menuRes, user);
};
start();
// mainMenu(user);