'use strict';
const axios = require('axios');
let url = 'http://localhost:3001/';
module.exports = async (user, story) => {

  const { token } = user;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await axios.delete(`${url}stories/${story._id}`, {}, config);
};
