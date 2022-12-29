/** @format */

'use strict';
const inquirer = require('inquirer');
const loginChoice = require('../axios/login');
const { diffRole } = require('../axios/roleChange');
const createChar = require('../axios/createChar');
const selectedChar = require('../axios/selectedChar');
const characterList = require('./characterList');
const getChars = require('../axios/getChars');

//SOCKETS
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/');

const selectedStory = require('./selectedStory');

const createRoom = require('../socket_handlers/createRoom');
const createStory = require('../axios/createStory');
const storiesList = require('./storiesList');
const getStories = require('../axios/getStories');
//*GAME LOGIC FUNCTIONS */
const {
  userPlaying,
  getClass,
  getCharacter,
  addSomeBad,
} = require('../inquirer/game-logic/heroProblem');
const {
  heroConnect,
  userConnect,
  checkForBad,
} = require('./game-logic/heroConnect');
const {
  dungeonMasterBegin,
  onGoingGame,
} = require('./game-logic/dungeonMaster');

const mainMenu = async (user) => {
  try {
    console.log('you are logged in as a', user.role);
    if (user.role === 'hero') {
      let response = await inquirer.prompt([
        {
          type: 'list',
          name: 'hero',
          message: 'please choose an option',
          choices: ['CHANGE ROLE', 'FIND GAME', 'VIEW CHARACTERS', 'EXIT'],
        },
      ]);
      return response.hero;
    } else {
      let response = await inquirer.prompt([
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
  let response = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleChange',
      message: 'Select your desired role',
      choices: ['hero', 'dungeon-master'],
    },
  ]);
  return response.roleChange;
};

socket.on('CLASS', async (payload) => await getClass(payload));
socket.on('CHARACTER', async (payload) => await getCharacter(payload));
const menuChoice = async (menuRes, user) => {
  // hero choices
  if (menuRes === 'CHANGE ROLE') {
    let change = await changeRole();
    if (change !== user.role) user = await diffRole(user, change);
    menuRes = await mainMenu(user);
    await menuChoice(menuRes, user);
  } else if (menuRes === 'FIND GAME') {
    socket.emit('GET_ROOMS');
    let currentRooms = ['THIS IS BAD'];

    socket.on('ROOMS', async (payload) => {
      currentRooms = payload;
      currentRooms.push('Back to main menu');
      const heroReply = await heroConnect(user, currentRooms);

      if (heroReply === 'Back to main menu') {
        socket.off();
        menuRes = await mainMenu(user);
        await menuChoice(menuRes, user);
      } else {
        await userConnect(heroReply, socket, user);
      }
    });
    socket.on('PROBLEM', async (payload) => {
      await userPlaying(user, socket, payload);

      const waitForAction = new Promise((resolve, reject) => {
        socket.on('FAVORABLE', () => {
          resolve(false);
        });
        socket.on('UNFAVORABLE', async () => {
          const data = await addSomeBad();
          console.log(data.data);
          const res = await checkForBad();
          let endGame;
          if (res.data.bad >= 3) {
            socket.emit('GAME_OVER', 'loss');
            endGame = true;
          }
          resolve(endGame);
        });
        socket.on('GAME_OVER', () => {
          console.log('GAME OVER');
          resolve(true);
        });
      });
      const actionResult = await waitForAction;

      if (actionResult) {
        menuRes = await mainMenu(user);
        await menuChoice(menuRes, user);
      }
    });
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
    createRoom(user.username, socket);

    const waitForAction = new Promise((resolve, reject) => {
      socket.on('TABLE', (payload) => {
        resolve({ payload });
      });
    });
    await waitForAction;

    const dmDecides = await dungeonMasterBegin();
    if (dmDecides === 'yes') {
      socket.emit('GAME_STARTED', user.username);
      await onGoingGame(user, socket);
      menuRes = await mainMenu(user);
      await menuChoice(menuRes, user);
    } else {
      menuRes = await mainMenu(user);
      await menuChoice(menuRes, user);
    }
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
