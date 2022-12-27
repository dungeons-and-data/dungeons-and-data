const inquirer = require('inquirer');

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
          choices: ['Warrior', 'Mage', 'Bard'],
        },
      ]);

    return reply;
  }
};