const inquirer = require('inquirer');
const axios = require('axios');
module.exports = async (character) => {
  console.log('Name:', character.name);
  console.log('Class:', character.class);
  console.log('Level:', character.level);
  const reply = await inquirer
    .prompt([
      { 
        type: 'list',
        name: 'chars',
        message: 'Choose an action',
        choices: ['CHANGE NAME', 'CHANGE CLASS', 'DELETE', 'BACK TO MAIN MENU'],
      },
    ]);
  if (reply.chars === 'CHANGE NAME') {
    const reply = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: `Please enter the new name for ${character.name}`,
        },
      ]);
    return ['nameChange', reply.name];
  } else if (reply.chars === 'CHANGE CLASS') {
    const data = await axios
      .get('https://www.dnd5eapi.co/api/classes');
    const classNames = data.data.results.map(prof => prof.name);
    const reply = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'profession',
          message: 'Choose a new class',
          choices: classNames,
        },
      ]);
    return ['classChange', reply.profession];
  } else if (reply.chars === 'DELETE') {
    const reply = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'delete',
          message: `Are you sure you want to delete ${character.name}`,
          choices: ['YES', 'NO'],
        },
      ]);
    if (reply.delete === 'YES') {
      return ['delete'];
    } else {
      return ['back'];
    }
  } else if (reply.chars === 'BACK TO MAIN MENU') {
    return ['back'];
  }
};