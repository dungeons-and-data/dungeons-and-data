const inquirer = require('inquirer');
module.exports = async () => {

  let data = {};
  const chapters = [];


  const reply = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'story',
        message: 'Do you want to create a new story?',
        choices: ['YES', 'NO'],
      },
    ]);
  if (reply.story === 'NO') { return; }
  else {
    await newStory();
  }
  async function newStory() {
    const reply = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter story name.',
        },
        {
          type: 'list',
          name: 'theme',
          message: 'Choose a theme (default is castle theme).',
          choices: ['CASTLE', 'FOREST', 'DESERT', 'CAVE'],
        },
      ]);

    data.name = reply.name;
    data.theme = reply.theme;
    await newChapter();
    console.log('new chapter is done');

  }
  async function newChapter() {
    const reply = await inquirer.prompt([
      {
        type: 'input',
        name: 'chapterName',
        message: 'Enter a name for the chapter',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a brief description of the chapter i.e. "you arrive on the castle floor."',
      },
    ]);
    const allScenarios = await newScenario();
    chapters.push(reply, allScenarios);

  }
  async function newScenario() {
    const scenarios = [];
    let a = 2;
    for (let i = 0; i <= a; i++) {
      const res = await inquirer.prompt([
        {
          type: 'input',
          name: 'scenarios',
          message: 'write a few scenarios i.e. "you encounter a large bat."',
        },
      ]);
      scenarios.push(res);
      if (scenarios.length >= 3) {
        const newScene = await inquirer.prompt([
          {
            type: 'list',
            name: 'scene',
            message: 'Do you want to create another scenario?',
            choices: ['YES', 'NO'],
          },
        ]);
        if (newScene.scene === 'YES') a++;
      }
    }
    return scenarios;
  }

  let b = 4;
  for (let i = 0; i < b; i++) {

    if (i < 3) await newChapter();
    if (i >= 3) {

      const moreChaps = await inquirer.prompt([
        {
          type: 'list',
          name: 'chap',
          message: 'Do you want to create another Chapter?',
          choices: ['YES', 'NO'],
        },
      ]);

      if (moreChaps.chap === 'YES') {
        b++;

        await newChapter();
      }
    }
  }

  data.chapter = chapters;

  return data;
};


