'use strict';
const inquirer = require('inquirer');
const loginChoice = require('../axios/login');
const { diffRole } = require('../axios/roleChange');
const createChar = require('../axios/createChar');
const selectedChar = require('../axios/selectedChar');
const characterList = require('./characterList');
const getChars = require('../axios/getChars');

const selectedStory = require('./selectedStory');


const createRoom = require('../socket_handlers/dungeon_masters/createRoom');
const { requestListOfRooms, getListOfRooms, joinRoom, socket } = require('../socket_handlers/heroes/roomHandlers');


const createStory = require('../axios/createStory');
const storiesList = require('./storiesList');
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

    socket.emit('GET_ROOMS');
    let currentRooms;
    socket.on('ROOMS', function(payload) {
      currentRooms = payload;
    });

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
    createRoom(user.username);
    console.log('starting new game');
  } else if (menuRes === 'VIEW STORIES') {
    const res = await storiesList(user, inquirer, getStories);
    if (res === 'BACK') {
      menuRes = await mainMenu(user);
      await menuChoice(menuRes, user);
    } else if (res === 'CREATE STORY') {
      await createStory(user);
      menuRes = await mainMenu(user);
      await menuChoice(menuRes, user);
    } else if (res === 'UPDATE STORY') {
      //todo update story function (menu for options)
      menuRes = await mainMenu(user);
      await menuChoice(menuRes, user);
    } else {
      let story = res;
      await selectedStory(user, story);
      menuRes = await mainMenu(user);
      await menuChoice(menuRes, user);
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
