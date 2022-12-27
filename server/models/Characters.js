'use strict';

const mongoose = require('mongoose');


const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  level: { type: Number, default: 1 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});


module.exports = mongoose.model('Characters', CharacterSchema);