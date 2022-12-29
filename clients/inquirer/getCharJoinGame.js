module.exports = async (user, inquirer, getChars) => {
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
  if (reply.chars === 'BACK') return 'BACK';
  if (reply.chars === 'CREATE CHARACTER') { return reply.chars; } else {
    const selectedData = characters
      .filter(char => char.name.toUpperCase() === reply.chars.toUpperCase());
    return selectedData[0];
  }
};