'use strict';

const express = require('express');
const { UserSchema } = require('../models');


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

    const user = new UserSchema(data);
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
    const allUsers = await UserSchema.find();
    res.status(200).send(allUsers);
  } catch (e) {
    next(e.message);
  }
}


async function update(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedItem = await UserSchema.findByIdAndUpdate({ id: id }, data, { new: true, overwrite: true })
    res.status(200).send(updatedItem);
  } catch (e) {
    next(e.message);
  }

}

async function destroy(req, res, next) {
  try {
    const id = req.params.id;
    await UserSchema.findByIdAndDelete({ id });
    res.status(204).send();
  } catch (e) {
    next(e.message);
  }


}

async function readOne(req, res, next) {
  try {
    const id = req.params.id;
    const oneUser = await UserSchema.findById({ id });
    res.status(200).send(oneUser);
  } catch (e) {
    next(e.message);
  }

}

module.exports = userRouter;




