/** @format */

'use strict';
const axios = require('axios');
let url = 'https://dungeons-and-data-staging.up.railway.app/';
module.exports = async (user, story) => {
  const { token } = user;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await axios.delete(`${url}stories/${story._id}`, {}, config);
};
