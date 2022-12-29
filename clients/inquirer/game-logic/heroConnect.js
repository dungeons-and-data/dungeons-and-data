'use strict';

const inquirer = require('inquirer');

async function heroConnect(rooms) {
  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'hero',
      message: 'pick a room',
      choices: rooms,
    },
  ]);
  return reply.hero;
}

async function userConnect(room, socket){
  socket.emit('JOIN', room);
}


module.exports = { heroConnect, userConnect };