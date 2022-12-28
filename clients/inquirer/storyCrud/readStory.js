/** @format */

'use strict';

const promptUpdate = require('./promptUpdate');
const readChapters = require('./readChapters');

module.exports = async (story, user, crud = 'read') => {
  console.log();
  console.log();
  console.log(story.storyName);
  console.log(story.theme);

  if (crud === 'update') {
    const choice = await promptUpdate(story, user);
    if (choice === 'BACK') {
      return;
    }
  }
  await readChapters(story, user, crud);
};
