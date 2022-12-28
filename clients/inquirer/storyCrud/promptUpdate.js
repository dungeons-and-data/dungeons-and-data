/** @format */

'use strict';

const inquirer = require('inquirer');
const storyName = require('../../axios/update-story/storyName');
const updateNewTheme = require('../../axios/update-story/updateNewTheme');
const updateStoryName = require('./updateStoryName');
const updateTheme = require('./updateTheme');

async function promptUpdate(story, user) {
  const reply = await inquirer.prompt([
    {
      type: 'list',
      message: 'Please make a selection',
      name: 'update',
      choices: ['CHANGE STORY NAME', 'CHANGE THEME', 'VIEW CHAPTERS', 'BACK'],
    },
  ]);
  if (reply.update === 'BACK') {
    return 'BACK';
  } else if (reply.update === 'VIEW CHAPTERS') {
    return 'VIEW CHAPTERS';
  } else if (reply.update === 'CHANGE THEME') {
    const newTheme = await updateTheme(story);
    await updateNewTheme(user, newTheme, story);
  } else if (reply.update === 'CHANGE STORY NAME') {
    const newStoryName = await updateStoryName(story);
    await storyName(user, newStoryName, story);
  }
}

module.exports = promptUpdate;
