/** @format */

'use strict';

const axios = require('axios');
let url = 'https://dungeons-and-data-staging.up.railway.app/';

async function scenario(userToken, newScenario, chapterId, story, original) {
  const { token } = userToken;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { storyName, theme, chapter, user, _id } = story;

  const updatedChap = chapter.filter((chap) => chap._id === chapterId);

  const remainingChaps = chapter.filter((chap) => chap._id !== chapterId);

  const { chapterName, scenarios, description } = updatedChap[0];

  const others = scenarios.filter((element) => original !== element);

  const body = {
    storyName,
    theme,
    chapter: [
      {
        chapterName,
        description,
        scenarios: [newScenario, ...others],
      },
      ...remainingChaps,
    ],
    user,
  };

  await axios.put(`${url}stories/${_id}`, body, config);

  return story;
}
module.exports = scenario;
