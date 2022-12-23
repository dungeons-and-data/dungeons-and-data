'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;


const UserSchema = new Schema({
  user_id: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: { type: String, required: true },

});



module.exports = mongoose.model('user', UserSchema);