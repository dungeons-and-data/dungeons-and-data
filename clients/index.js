'use strict';
const loginChoice = require('./axiosFN/login')
require('dotenv').config();
const { mainMenu, changeRole, menuChoice } = require('./UI/mainMenu')

const start = async () => {
  const user = await loginChoice();
  const menuRes = await mainMenu(user);
const mainChoice = await menuChoice(menuRes, user)
}
start();
// mainMenu(user);