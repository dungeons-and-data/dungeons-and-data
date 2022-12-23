'use strict';


const Users = require('../../../models/User');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = async (token) => {
  try {
    const parsedToken = jwt.verify(token, SECRET);
    const user = Users.findOne({ username: parsedToken.username });
    if (user) { return user; }
    throw new Error('User Not Found');
  } catch (e) {
    throw new Error(e.message);
  }
};