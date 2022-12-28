'use strict';

const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  storyName: { type: String, required: true },
  theme: {
    type: String,
    default: 'castle',
    enum: ['castle', 'forest', 'desert', 'cave'],
  },
  chapter: [{
    chapterName: { type: String, required: true },
    description: { type: String, require: true },
    scenarios: [{ type: String, required: true }],
  }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

module.exports = mongoose.model('Stories', StorySchema);