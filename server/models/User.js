'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

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
    required: true },
  role: { 
    type: String, 
    required: true },
  characters: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Characters' }], 
}, 
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

UserSchema.virtual('token')
  .get(function() {
    return jwt.sign({username: this.username}, SECRET);  
  });


UserSchema.pre('save', async function(next) {
  try {
    // Hash the password using bcrypt
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

const Users = mongoose.model('Users', UserSchema); 

module.exports = Users;