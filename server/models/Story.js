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
    chapterName: {type: String, required: true},
    description: {type: String, require: true},
    scenarios: [{type: String, required: true}],
  }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

module.exports = mongoose.model('Stories', StorySchema);

/* const StorySchema = new mongoose.Schema({
  stories: [{
    theme: {
      themeName: String, // Kenny's Adventures
      stories: [{
        story: String, // Ground floor
        description: String, // "You arrive on the ground floor of the castle"
        chapters: [String], // [each scenario on the ground floor]
      },
      {
        story: String, // 2nd floor
        description: String, // "You arrive on the 2nd floor of the castle"
        chapters: [String], // [each scenario on the 2nd floor]
      }],
    },
  }],
});
*/