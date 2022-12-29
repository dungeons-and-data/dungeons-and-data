/** @format */

'use strict';

const inquirer = require('inquirer');
const getStories = require('../../axios/getStories');
const storiesList = require('../storiesList');
const readChapters = require('../storyCrud/readChapters');
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

  while (readChapters.length > 0) {


    remainingChaps = await gamePlay(remainingChaps, socket);
  }
 
}

module.exports = { dungeonMasterBegin, onGoingGame };
