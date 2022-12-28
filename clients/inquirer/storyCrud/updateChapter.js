/** @format */

'use strict';

const inquirer = require('inquirer');
const chapterName = require('../../axios/update-story/chapterName');

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

module.exports = { updateChapter, updateChapterName };
