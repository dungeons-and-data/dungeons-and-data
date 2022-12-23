'use strict';

const Users = require('../../../models/User');
const bcrypt = require('bcrypt');

module.exports =  async (username, password) => {
  console.log('AUTH BASIC!');
  const user = await Users.findOne({ username });
  console.log(user);
  const valid = await bcrypt.compare(password, user.password);
  if (valid) { return user; }
  throw new Error('Invalid User');
};
  