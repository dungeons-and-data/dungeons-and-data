'use strict';


const express = require('express');
const Characters = require('../models/Characters');


const heroRouter = express.Router();
//ROUTES

heroRouter.route('/character').post(makeCharacter);

heroRouter.route('/character/:id').get(getOneCharacter);

heroRouter.route('/character').get(getAllCharacters);

heroRouter.route('/character/:id').put(modifyCharacter);

heroRouter.route('/character/:id').delete(deleteCharacter);


//FUNCTIONS

async function makeCharacter(req,res,next) {
  try {
    const data = req.body;

    const character = new Characters(data);
    await character.save();
    res.status(200).json(character);
    
  } catch(e) {
    next(e.message);
  }
}

async function getOneCharacter(req, res, next) {
  try { const id = req.params.id;
    const oneCharacter = await Characters.findById(id);
    if (!oneCharacter) res.status(404).send('Character Not Found');
    res.status(200).send(oneCharacter);
  }catch(e) {
    next(e.message);
  }

}

async function getAllCharacters(req, res, next) {
  try {
    const allCharacters = await Characters.find();
    if (allCharacters.length === 0) res.status(404).send('No Characters Found');
    res.status(200).send(allCharacters);
  }catch(e) {
    next(e.message);
  }

}

async function  modifyCharacter(req, res, next) {
  try { const id = req.params.id;
    const oneCharacter = await Characters.findById(id);
    const data = req.body;
    if(!oneCharacter) res.status(404).send('No Character Found');
    const updatedCharacter = await Characters.findByIdAndUpdate(id, data, {new: true, overwrite: true });
    res.status(202).send(updatedCharacter);
    console.log('~ Updated Character!');
  }catch(e) {
    next(e.message);
  }

}


async function  deleteCharacter(req, res, next) {
  try { 
    const id = req.params.id;
    const oneCharacter = await Characters.findById(id);
    if(!oneCharacter) res.status(404).send('No Character Found');
    await Characters.findByIdAndDelete(id);
    res.status(204).send();
  }catch(e) {
    next(e.message);
  }

}

module.exports = heroRouter;