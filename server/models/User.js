'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let SECRET;
if (process.env.NODE_ENV === 'test') {
  SECRET = 'testEnvironment';
} else {
  SECRET = process.env.SECRET;
}

const mongoose = require('mongoose');

const { Schema } = mongoose;


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['hero', 'dungeon-master'],
  },
  characters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Characters',
  }],
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

UserSchema.virtual('token')
  .get(function () {
    return jwt.sign({ username: this.username }, SECRET);
  });


UserSchema.virtual('capabilities')
  .get(function () {
    const acl = {
      hero: ['read'],
      'dungeon-master': ['read', 'create', 'update', 'delete'],
    };
    return acl[this.role];
  });


UserSchema.pre('save', async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;