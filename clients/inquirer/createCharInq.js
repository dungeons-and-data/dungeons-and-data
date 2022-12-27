const inquirer = require('inquirer');
const axios = require('axios');
module.exports = async () => {



  const reply = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'chars',
        message: 'Do you want to create a new character?',
        choices: ['YES', 'NO'],
      },
    ]);
  if (reply.chars === 'NO') { return; }
  else {
    const data = await axios
      .get('https://www.dnd5eapi.co/api/classes');
    const classNames = data.data.results.map(prof => prof.name);
    const reply = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter character name.',
        },
        {
          type: 'list',
          name: 'profession',
          message: 'Please choose a class.',
          choices: classNames,
        },
      ]);

    return reply;
  }
};