'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: { type: String, required: true },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Characters' }],
});



module.exports = mongoose.model('Users', UserSchema);