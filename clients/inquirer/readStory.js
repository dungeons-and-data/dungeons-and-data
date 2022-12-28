'use strict';

const inquirer = require('inquirer');


module.exports = async (story) => {
  console.log();
  console.log();
  console.log(story.storyName);
  console.log(story.theme);

  const chapters = story.chapter.map((item, idx) => [idx + 1, item.chapterName.toUpperCase()]);
  const displayList = chapters.map(item => item[0] + ' ' + item[1]);
  const chaptersId = story.chapter.map(item => item._id);
  displayList.push('EXIT');

  //todo CREATE FUNCTION TO CALL THIS INQUIRER LATER
  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'chap',
      message: 'Select a Chapter',
      choices: [...displayList],
    },
  ]);


  if (reply.chap === 'EXIT') { return; }

  const index = reply.chap.split(' ').shift();

  const chapIdx = chaptersId[Number(index) - 1];

  const chosenChapter = story.chapter.filter(item => chapIdx === item._id);
  console.log(chosenChapter);
  
};