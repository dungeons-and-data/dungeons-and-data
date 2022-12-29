<!-- @format -->

# MIDTERM - D49

# Project: Dungeons and Data

[Project Management Link](https://www.figma.com/file/QzMWfgnC5G62PPBUmrwnYk/Dungeons-and-Data-UML?node-id=0%3A1&t=TTidntq1Nir1Ojsl-0)

Author: Kenny Lino, Zoe Gonzalez, Lewis Benson, Jacob Dang, and Elias ‘Wami’ Staehle

## Problem Domain

Not everyone has the time for a full-length D&D game or the ability to play with remote friends. Dungeons and Data take the nostalgic experience and the modern application of being able to play remotely. Choose between a hero or DM, and create your D&D adventure. Create stories, update old stories, gain inspiration from other's stories, and above all, have fun on your endless adventures. Dungeons and data solves the problem of not being able to enjoy D&D with your friends around at the world at anytime.

## User Stories

- As a user I want to be able to choose between DM or Hero so that I can play in the role that best fits the group

- As a user I want to be able to create new stories so that I can keep the game dynamic for my friends

- As a user I want to be able to choose a current story so that I can immediately begin playing with my friends

- As a user I want to be able to create a character with a specific class so I can fill a role to play with my friends

- As a user I want to be able to view stories that other DMs created so that I can build on or gain inspiration from their adventures

- As a Hero I do will not be able to access the stories to keep the mystery of the story fresh

- As a Hero I will only be able to read what is presented to me from the DM

- As a Hero I want to be able to respond with abilities from the classic D&D game to keep the experience authentic

- As a DM I want to be able to control the flow of the game and determine the outcome of the user's experiences

- As a DM I will only be able to modify my own stories so that I cannot disrupt another DM's game

## Links and Resources

### Setup

`npm i` to install dependencies
`node index.js` - in order to start the server and clients; run from `/server` and `/clients`
`node terminalViewer.js` - in order to see the progress of the game; run from `/clients/inquirer/game-logic`

### `.env` requirements

see `.env.sample`

### How to initialize/run your application (where applicable)

In order to run the application, we need to have our server, clients and terminal viewer running.

When working on one machine, this should be at least 4 separate windows-- 1 for the server, 1 for the Dungeon Master, 1+ for the Heroes, and 1 for the terminal viewer. The terminal viewer will show the current state of the game.

If running across multiple machines with the deployed server, then each client can run `/clients/index.js` and `/clients/inquirer/game-logic/terminalViewer.js` to play the game.

### Features / Routes

#### Users

- `/signup` -- path used to sign up
- `/login` -- path used to login with basic auth
- `/users` -- path to get all users

#### Heroes

- `/character` -- route used to manage CRUD functionality for characters used by heroes

#### Dungeon Masters

- `/stories` -- route used to manage CRUD functionality for stories used by DMs

### Tests

- How do you run tests?
  - npm test
- Any tests of note?

  - handles every CRUD function
  - handles middleware
  - handles database calls

### UML

![UML](./assets/uml.jpg)
![UML](./assets/roles.jpg)
![UML](./assets/database.jpg)
![UML](./assets/flowchart.jpg)
