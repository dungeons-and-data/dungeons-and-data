/** @format */

'use strict';

const axios = require('axios');
let url = 'http://localhost:3001/';

async function chapterName(userToken, chapterName, chapterId, story) {
  const { token } = userToken;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { storyName, theme, chapter, user, _id } = story;

  const updatedChap = chapter.filter((chap) => chap._id === chapterId);
  console.log(updatedChap);
  const remainingChaps = chapter.filter((chap) => chap._id !== chapterId);
  console.log(remainingChaps);
  const { description, scenarios } = updatedChap;
  const body = {
    storyName,
    theme,
    chapter: [
      {
        chapterName,
        description,
        scenarios: [...scenarios],
      },
      ...remainingChaps,
    ],
    user,
  };

  await axios.put(`${url}stories/${_id}`, body, config);

  return story;
}
module.exports = chapterName;