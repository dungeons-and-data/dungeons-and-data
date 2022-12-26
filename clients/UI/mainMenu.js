'use strict';
const inquirer = require('inquirer');
const loginChoice = require('../axiosFN/login')
const {diffRole} = require('../axiosFN/roleChange')
const mainMenu = async (user) => {
  try {
    console.log('you are logged in as a', user.role)
    if (user.role === 'hero') {
      let response = await inquirer
        .prompt([
          {
            type: 'list',
            name: 'hero',
            message: 'please choose an option',
            choices: ['CHANGE ROLE', 'FIND GAME', 'VIEW CHARACTERS', 'EXIT'],
          }
        ])
      return response.hero
    } else {
      let response = await inquirer
        .prompt([
          {
            type: 'list',
            name: 'DM',
            message: 'please choose an option',
            choices: ['CHANGE ROLE', 'START NEW GAME', 'VIEW STORIES', 'EXIT'],
          }
        ])
      return response.DM
    }
  } catch (e) {
    console.log(e.message);
  }
}

const changeRole = async () => {
  let response = await inquirer
    .prompt([{
      type: 'list',
      name: 'roleChange',
      message: 'Select your desired role',
      choices: ['hero', 'dungeon-master']

    }])
  return response.roleChange;
}

const menuChoice = async (menuRes, user) => {
  if (menuRes === 'CHANGE ROLE') {
    let change = await changeRole();
    if (change !== user.role) user = await diffRole(user, change)
    await mainMenu(user)
  } else if (menuRes === 'FIND GAME') {
    console.log('finding game');
  } else if (menuRes === 'VIEW CHARACTERS') {

  } else if (menuRes === 'START NEW GAME') {
    console.log('starting new game')
  } else if (menuRes === 'VIEW STORIES') {

  } else if (menuRes === 'EXIT') {
    loginChoice();
  }
  return;
}
module.exports = {
  mainMenu,
  changeRole,
  menuChoice,
}
