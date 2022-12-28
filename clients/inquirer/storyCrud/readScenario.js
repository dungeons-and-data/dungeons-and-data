/** @format */

const inquirer = require('inquirer');
const {
  updateChapter,
  updateChapterName,
  updateDescription,
  updateScenarios,
} = require('./updateChapter');

async function readScenario(chapter, story, user, chapId, crud) {
  console.log(chapter.chapterName);
  console.log(chapter.description);

  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'chap',
      message: `Would you like to ${crud} this chapter?`,
      choices: ['YES', 'NO'],
    },
  ]);
  if (reply.chap === 'YES') {
    chapter.scenarios.forEach((ele) => {
      console.log(ele);
    });
    if (crud === 'update') {
      const choice = await updateChapter(chapter);
      if (choice === 'BACK') return;
      if (choice === 'CHANGE CHAPTER NAME') {
        await updateChapterName(chapter, story, chapId, user);
        return;
      } else if (choice === 'CHANGE DESCRIPTION') {
        await updateDescription(chapter, story, chapId, user);
        return;
      } else if (choice === 'EDIT SCENARIOS') {
        await updateScenarios(chapter, story, chapId, user);
        return;
      }
    }
    return 'YES';
  } else if (reply.chap === 'NO') {
    return 'NO';
  }
}

module.exports = readScenario;
