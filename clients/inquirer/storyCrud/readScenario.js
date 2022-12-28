/** @format */

const inquirer = require('inquirer');
const { updateChapter, updateChapterName } = require('./updateChapter');

async function readScenario(chapter, story, user, chapId, crud) {
  console.log(chapter.chapterName);
  console.log(chapter.description);

  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'chap',
      message: `Would you like to ${crud} this chapter?`,
      choices: ['YES', 'NO', 'BACK'],
    },
  ]);
  if (reply.chap === 'YES') {
    chapter.scenarios.forEach((ele) => {
      console.log(ele);
    });
    if (crud === 'update') {
      const choice = await updateChapter(chapter);
      if (choice === 'BACK') return;
      await updateChapterName(chapter, story, chapId, user);
      return;
    }
    return 'YES';
  } else if (reply.chap === 'NO') {
    return 'NO';
  } else if (reply.chap === 'BACK') {
    return 'BACK';
  }
}

module.exports = readScenario;
