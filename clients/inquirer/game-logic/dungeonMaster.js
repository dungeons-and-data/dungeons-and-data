/** @format */

'use strict';
const inquirer = require('inquirer');
const getStories = require('../../axios/getStories');
const storiesList = require('../storiesList');
const gamePlay = require('./gamePlay');
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

async function onGoingGame(user, socket) {
  const story = await storiesList(user, inquirer, getStories);
  socket.emit('GAME_CHOSEN', story.storyName);
  let data = story.chapter;

  let remainingChaps = data.map((item) => [
    item.chapterName,
    item.description,
    item.scenarios,
  ]);

  while (remainingChaps.length > 0) {
    if (remainingChaps === 'end') return;
    console.log(remainingChaps);
    remainingChaps = await gamePlay(remainingChaps, socket);
  }

  socket.emit('GAME_OVER', 'VICTORY!');
  return;
}

module.exports = { dungeonMasterBegin, onGoingGame };
