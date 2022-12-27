'use strict';
const getChars = require('../axios/getChars');

module.exports = async (user, inquirer) => {
  let characters = await getChars(user);
  characters = characters.length ? characters : [];
  const characterNames = characters.map(char => char.name.toUpperCase());
  const reply = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'chars',
        message: 'Select Character',
        choices: [...characterNames, 'CREATE CHARACTER', 'BACK'],
      },
    ]);
  if (reply.chars === 'BACK') return;
  if (reply.chars === 'CREATE CHARACTER') return reply.chars;
  const selectedData = characters
    .filter(char => char.name.toUpperCase() === reply.chars.toUpperCase());
  return selectedData[0];
};
