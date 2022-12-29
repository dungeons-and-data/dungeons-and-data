/** @format */

'use strict';

const inquirer = require('inquirer');

async function heroConnect(rooms) {
  console.log('running inq');
  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'hero',
      message: 'pick a room',
      choices: rooms,
    },
  ]);
  console.log();
  return reply.hero;
}

function userConnect(room, socket) {
  socket.emit('JOIN', room);
}

module.exports = { heroConnect, userConnect };
