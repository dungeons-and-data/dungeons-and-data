'use strict';

const express = require('express');
const { Users } = require('../models');


const userRouter = express.Router();


userRouter.route('/signup')
  .post(signup);

userRouter.route('/login')
  .post(login);

userRouter.route('/users')
  .get(usersRoute);
userRouter.route('/users/:id')
  .get(readOne)
  .put(update)
  .delete(destroy);


async function signup(req, res, next) {
  try {


    const data = req.body;

    const user = new Users(data);
    await user.save();
    res.status(200).json(user);

  } catch (e) {
    next(e.message);
  }
}

function login(req, res, next) {
  try {

    res.status(200).json(req.user);
  } catch (e) {
    next(e.message);
  }
}

async function usersRoute(req, res, next) {
  try {
    const allUsers = await Users.find();
    res.status(200).send(allUsers);
  } catch (e) {
    next(e.message);
  }
}


async function update(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedItem = await Users.findByIdAndUpdate({ id }, data, { new: true, overwrite: true });
    res.status(200).send(updatedItem);
  } catch (e) {
    next(e.message);
  }

}

async function destroy(req, res, next) {
  try {
    const id = req.params.id;
    await Users.findByIdAndDelete({ id });
    res.status(204).send();
  } catch (e) {
    next(e.message);
  }


}

async function readOne(req, res, next) {
  try {
    const id = req.params.id;
    const oneUser = await Users.findById({ id });
    res.status(200).send(oneUser);
  } catch (e) {
    next(e.message);
  }

}

module.exports = userRouter;


/** 
for reference later
Users.findOne({ username: 'lbenson' }).populate('characters').exec((err, user) => {
  console.log(user);
});


EXAMPLE OF DATA RETURNED IF FIND() WAS PREFORMED 
{
  "_id": "5f7d7c1b4e9aa7f1d93f9b7e",
  "username": "lbenson",
  "token": "<hashed token>",
  "password": "<hashed password>",
  "characters": [
    {
      "_id": "5f7d7c1b4e9aa7f1d93f9b7f",
      "name": "Bob",
      "class": "Warrior",
      "level": 15
    },
    {
      "_id": "5f7d7c1b4e9aa7f1d93f9b80",
      "name": "Sue",
      "class": "Mage",
      "level": 12
    }
  ]
}

*/