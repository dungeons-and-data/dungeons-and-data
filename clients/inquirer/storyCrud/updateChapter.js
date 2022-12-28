/** @format */

'use strict';

const inquirer = require('inquirer');
const chapterName = require('../../axios/update-story/chapterName');
const description = require('../../axios/update-story/description');
const scenario = require('../../axios/update-story/scenario');

async function updateChapter(chapter) {
  console.log('Chapter Name:', chapter.chapterName);
  console.log('Chapter Description:', chapter.description);

  const reply = await inquirer.prompt([
    {
      type: 'list',
      message: 'Please make a selection',
      name: 'update',
      choices: [
        'CHANGE CHAPTER NAME',
        'CHANGE DESCRIPTION',
        'EDIT SCENARIOS',
        'BACK',
      ],
    },
  ]);
  return reply.update;
}

async function updateChapterName(chapter, story, chapId, user) {
  console.log('Chapter Name:', chapter.chapterName);
  console.log('Chapter Description:', chapter.description);

  const reply = await inquirer.prompt([
    {
      type: 'input',
      message: 'Enter a new chapter name',
      name: 'chapterName',
    },
  ]);
  return await chapterName(user, reply.chapterName, chapId, story);
}

async function updateDescription(chapter, story, chapId, user) {
  console.log('Chapter Name:', chapter.chapterName);
  console.log('Chapter Description:', chapter.description);

  const reply = await inquirer.prompt([
    {
      type: 'input',
      message: 'Enter a new chapter description',
      name: 'description',
    },
  ]);
  return await description(user, reply.description, chapId, story);
}

async function updateScenarios(chapter, story, chapId, user) {
  console.log('Chapter Name:', chapter.chapterName);
  console.log('Chapter Description:', chapter.description);

  const scenarios = chapter.scenarios.map((item) => item);

  const reply = await inquirer.prompt([
    {
      type: 'list',
      message: 'Choose a scenario',
      name: 'scenario',
      choices: scenarios,
    },
  ]);
  const newScenario = await chosenScenario(reply.scenario);
  return await scenario(user, newScenario, chapId, story, reply.scenario);
}

async function chosenScenario(scenario) {
  console.log('Chosen Scenario:', scenario);
  const reply = await inquirer.prompt([
    {
      type: 'input',
      message: 'Write a new scenario',
      name: 'scenario',
    },
  ]);

  return reply.scenario;
}

module.exports = {
  updateChapter,
  updateChapterName,
  updateDescription,
  updateScenarios,
};
