/** @format */

'use strict';
const inquirer = require('inquirer');
const readScenario = require('./readScenario');

async function readChapters(story, user, crud) {
  const chapters = story.chapter.map((item, idx) => {
    console.log(item);
    return [idx + 1, item.chapterName.toUpperCase()];
  });
  const displayList = chapters.map((item) => item[0] + ' ' + item[1]);
  const chaptersId = story.chapter.map((item) => item._id);
  displayList.push('EXIT');
  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'chap',
      message: 'Select a Chapter',
      choices: [...displayList],
    },
  ]);

  if (reply.chap === 'EXIT') {
    return;
  }

  const index = reply.chap.split(' ').shift();

  const chapId = chaptersId[Number(index) - 1];

  const chosenChapter = story.chapter.filter((item) => chapId === item._id);

  const nextOption = await readScenario(
    chosenChapter[0],
    story,
    user,
    chapId,
    crud
  );
  if (nextOption === 'YES') return await readChapters(story, user, crud);
  if (nextOption === 'NO') return;
  if (nextOption === 'BACK') return;
}
module.exports = readChapters;
