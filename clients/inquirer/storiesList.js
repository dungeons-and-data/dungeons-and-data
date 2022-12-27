'use strict';

module.exports = async (user, inquirer, getStories) => {
  let stories = await getStories(user);
  stories = stories.length ? stories : [];
  const storyNames = stories.map(char => char.name.toUpperCase());
  const reply = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'stories',
        message: 'Select Story',
        choices: [...storyNames, 'CREATE STORY', 'BACK'],
      },
    ]);
  if (reply.stories === 'BACK') return 'BACK';
  if (reply.stories === 'CREATE STORY') { return reply.stories; } else {
    const selectedData = stories
      .filter(char => char.name.toUpperCase() === reply.stories.toUpperCase());
    return selectedData[0];
  }
};