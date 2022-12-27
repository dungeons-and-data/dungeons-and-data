const inquirer = require('inquirer');
const axios = require('axios');
module.exports = async () => {
  let data = {}
  const chapters = [];
const scenarios = [];

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
      await newChapter();
      data.name = reply.name;
      data.theme = reply.theme
    }
    async function newChapter() {
      if(chapters.length >= 3) {
        const newChap = await inquirer.prompt([
          {
            type: 'list',
            message: 'Do you want to create another chapter?',
            name: 'story',
            choices: ['YES', 'NO'],
          },
        ])
        if (newChap.story === 'NO') { return; }
        else { await newChapter(); }

      }
    
      const reply = await inquirer.prompt([
        {
          type: 'iput',
          name: 'chapterName',
          message: 'Enter a name for the chapter',
        },
        {
          type: 'input',
          name: 'description',
          message: 'Enter a brief description of the chapter i.e. "you arive on the castle floor."',
          choices: ['CASTLE', 'FOREST', 'DESERT', 'CAVE'],
        },
      ])
      await newScenario(reply);
       
       
    }
   async function newScenario(reply){
    const res = await inquirer.prompt([
      {
          type: 'input',
          name: 'scenarios',
          message: 'write a few scenarios i.e. "you encounter a large bat."',
      }
    ])
    if(!scenarios[0]?.chapterName){
      scenarios.push(reply);
      console.log('sadasdkjnwqejkdjkoadjasndsahnjdsahndjksa-----------------',chapters.scenarios)
    }
      scenarios.push(res)
    if(scenarios.length < 3){
      console.log(scenarios)
      await newScenario(reply);
    }else {
      const newScene = await inquirer.prompt([
        {
          type: 'list',
          name: 'scene',
          message: 'Do you want to create another scenario?',
          choices: ['YES', 'NO'],
        },
      ])
      if (newScene.scene === 'NO') { 
        chapters.push(scenarios)
        return newChapter(); 
      }
      else { await newScenario(reply); }
    }
    
  }
  data.chapter = chapters
  // data.chapter.scenarios = scenarios
 
  console.log('------------------',data.chapter);
  return data
}
};