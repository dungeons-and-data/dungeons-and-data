'use strict';
const inquirer = require('inquirer');
const loginChoice = require('../axios/login');
const { diffRole } = require('../axios/roleChange');
const createChar = require('../axios/createChar');
const selectedChar = require('../axios/selectedChar');
const characterList = require('./characterList');
const getChars = require('../axios/getChars');
const createStory = require('../axios/createStory');
const storieslist = require('./storiesList');
const getStories = require('../axios/getStories');
const mainMenu = async (user) => {
  try {
    console.log('you are logged in as a', user.role);
    if (user.role === 'hero') {
      let response = await inquirer
        .prompt([
          {
            type: 'list',
            name: 'hero',
            message: 'please choose an option',
            choices: ['CHANGE ROLE', 'FIND GAME', 'VIEW CHARACTERS', 'EXIT'],
          },
        ]);
      return response.hero;
    } else {
      let response = await inquirer
        .prompt([
          {
            type: 'list',
            name: 'DM',
            message: 'please choose an option',
            choices: ['CHANGE ROLE', 'START NEW GAME', 'VIEW STORIES', 'EXIT'],
          },
        ]);
      return response.DM;
    }
  } catch (e) {
    console.error(e.message);
  }
};

const changeRole = async () => {
  let response = await inquirer
    .prompt([{
      type: 'list',
      name: 'roleChange',
      message: 'Select your desired role',
      choices: ['hero', 'dungeon-master'],

    }]);
  return response.roleChange;
};

const menuChoice = async (menuRes, user) => {
  // hero choices
  if (menuRes === 'CHANGE ROLE') {
    let change = await changeRole();
    if (change !== user.role) user = await diffRole(user, change);
    menuRes = await mainMenu(user);
    await menuChoice(menuRes, user);
  } else if (menuRes === 'FIND GAME') {
    console.log('finding game');
  } else if (menuRes === 'VIEW CHARACTERS') {
    const res = await characterList(user, inquirer, getChars);

    if (res === 'BACK') {
      menuRes = await mainMenu(user);
      await menuChoice(menuRes, user);
    } else if (res === 'CREATE CHARACTER') {
      await createChar(user);
      menuRes = await mainMenu(user);
      await menuChoice(menuRes, user);
    } else {
      await selectedChar(res, user);
      menuRes = await mainMenu(user);
      await menuChoice(menuRes, user);
    }

  } else if (menuRes === 'START NEW GAME') {
    console.log('starting new game');
  } else if (menuRes === 'VIEW STORIES') {
    const res = await storieslist(user, inquirer, getStories);

    if (res === 'BACK') {
      menuRes = await mainMenu(user);
      await menuChoice(menuRes, user);
    } else if (res === 'CREATE STORY') {
      await createStory(user);
      menuRes = await mainMenu(user);
      await menuChoice(menuRes, user);
    } else {
      console.log('in progress')
      // await selectedChar(res, user);
      // menuRes = await mainMenu(user);
      // await menuChoice(menuRes, user);
    }
  } else if (menuRes === 'EXIT') {
    await loginChoice();
  }
  return;
};
module.exports = {
  mainMenu,
  changeRole,
  menuChoice,
};
