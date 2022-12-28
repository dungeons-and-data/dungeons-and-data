/** @format */

'use strict';

const inquirer = require('inquirer');

async function updateStoryName(story) {
  console.log('Current Story Name:', story.storyName);
  const reply = await inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter a new name for the story.',
      name: 'storyName',
    },
  ]);
  return reply.storyName;
}
module.exports = updateStoryName;
