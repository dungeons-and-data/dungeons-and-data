'use strict';
const inquirer = require('inquirer');
const deleteStory = require('../axios/deleteStory');
const getStories = require('../axios/getStories');
const readStory = require('./readStory');
const storiesList = require('./storiesList');

module.exports = async (user, story) => {

  console.log('Name:', story.storyName);
  console.log('Theme:', story.theme);
  console.log('Number of chapters:', story.chapter.length);
  const reply = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'story',
        message: 'Choose an action',
        choices: ['UPDATE STORY', 'READ STORY', 'DELETE STORY', 'BACK TO MAIN MENU'],
      },
    ]);




  if (reply.story === 'UPDATE STORY') {
    console.log('NEED FUNCTION HERE');
    //todo
  } else if (reply.story === 'READ STORY') {
    await readStory(story);
    await storiesList(user, inquirer, getStories);
  } else if (reply.story === 'DELETE STORY') {
    const reply = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'delete',
          message: `Are you sure you want to delete ${story.storyName}`,
          choices: ['YES', 'NO'],
        },
      ]);
    if (reply.delete === 'YES') {
      await deleteStory(user, story);
      await storiesList(user, inquirer, getStories);
    } else {
      return 'back';
    }
  } else if (reply.chars === 'BACK TO MAIN MENU') {
    return 'back';
  }
};