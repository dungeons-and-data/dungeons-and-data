/** @format */

'use strict';

const inquirer = require('inquirer');

async function updateTheme(story) {
  console.log('Story Name:', story.storyName);
  console.log('Current Theme:', story.theme);
  const reply = await inquirer.prompt([
    {
      type: 'list',
      message: 'Please choose a new theme',
      name: 'theme',
      choices: ['CASTLE', 'FOREST', 'DESERT', 'CAVE'],
    },
  ]);
  return reply.theme.toLowerCase();
}

module.exports = updateTheme;
