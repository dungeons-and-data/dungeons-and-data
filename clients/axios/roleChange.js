/** @format */

'use strict';
const axios = require('axios');

let url =
  process.env.URL || 'https://dungeons-and-data-staging.up.railway.app/';
const diffRole = async (user, change) => {
  const { token } = user;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    username: user.username,
    password: user.password,
    role: change,
  };
  const changedRole = await axios.put(`${url}users/${user.id}`, body, config);

  return changedRole.data;
};
module.exports = {
  diffRole,
};
