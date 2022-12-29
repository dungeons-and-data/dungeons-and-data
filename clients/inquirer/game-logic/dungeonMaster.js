/** @format */

'use strict';
let gameOn;
const inquirer = require('inquirer');
const getStories = require('../../axios/getStories');
const storiesList = require('../storiesList');
const gamePlay = require('./gamePlay');
const gameOnTwo = require('../game-logic/gamePlay');
async function dungeonMasterBegin() {
  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'begin',
      message: 'Are you ready to start your adventure?',
      choices: ['yes', 'no'],
    },
  ]);
  return reply.begin;
}

function gameOver() {
  gameOn = false;
}

async function onGoingGame(user, socket) {
  socket.on('GAME_OVER_DM', () => {
    console.log('GAME OVER RAN');
    gameOver();
    gameOnTwo();
  });
  gameOn = true;
  const story = await storiesList(user, inquirer, getStories);
  socket.emit('GAME_CHOSEN', story.storyName);
  let data = story.chapter;

  let remainingChaps = data.map((item) => [
    item.chapterName,
    item.description,
    item.scenarios,
  ]);

  while (remainingChaps.length > 0) {
    if (!gameOn) {
      return;
    }
    remainingChaps = await gamePlay(remainingChaps, socket);
  }
  if (!gameOn) {
    return;
  }
  socket.emit('GAME_OVER', 'VICTORY!');
  return;
}

module.exports = { dungeonMasterBegin, onGoingGame, gameOver };
