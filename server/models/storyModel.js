'use strict';

const mongoose = require('mongoose');


const StorySchema = new mongoose.Schema({
  themes: [{
    theme: {
      themeName: String,
      stories: [{
        story: String,
        description: String,
        chapters: [String],
      }],
    },
  }],
});


module.exports = mongoose.model('Story', StorySchema);

