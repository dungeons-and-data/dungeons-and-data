'use strict';

const express = require('express');
const Stories = require('../models/Story');


const DMRouter = express.Router();

// Read all stories for single DM
DMRouter.route('/stories').get(getAllStories);

// Read a single for single DM
DMRouter.route('/stories/:id').get(getOneStory);

// Create a single new story
DMRouter.route('/stories').post(addNewStory);

// Read a single new story
DMRouter.route('/stories/:id').put(modifyStory);

// Delete a single story
DMRouter.route('/stories/:id').delete(deleteStory);

async function addNewStory(req,res,next) {
  try {
    const data = req.body;
  
    const story = new Stories(data);
    await story.save();
    res.status(200).json(story);
      
  } catch(e) {
    next(e.message);
  }
}
  

async function getOneStory(req, res, next) {
  try { 
    const id = req.params.id;
    const oneStory = await Stories.findById(id);
    if (!oneStory) res.status(404).send('Story Not Found');
    res.status(200).send(oneStory);
  }catch(e) {
    next(e.message);
  }
  
}
  
async function getAllStories(req, res, next) {
  try {
    const allStories = await Stories.find();
    if (allStories.length === 0) res.status(404).send('No Stories Found');
    res.status(200).send(allStories);
  }catch(e) {
    next(e.message);
  }
  
}
  
async function modifyStory(req, res, next) {
  try { const id = req.params.id;
    const oneStory = await Stories.findById(id);
    const data = req.body;
    if(!oneStory) res.status(404).send('No Story Found');
    const updatedStory = await Stories.findByIdAndUpdate(id, data, {new: true, overwrite: true });
    res.status(202).send(updatedStory);
    console.log('~ Updated Story!');
  }catch(e) {
    next(e.message);
  }
  
}
  
  
async function deleteStory(req, res, next) {
  try { 
    const id = req.params.id;
    const oneStory = await Stories.findById(id);
    if(!oneStory) res.status(404).send('No Story Found');
    await Stories.findByIdAndDelete(id);
    res.status(204).send();
  }catch(e) {
    next(e.message);
  }
  
}
  
module.exports = DMRouter;