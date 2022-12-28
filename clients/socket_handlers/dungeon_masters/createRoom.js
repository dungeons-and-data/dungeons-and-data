'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/');

function createRoom(dungeonMasterId) {
  socket.emit('JOIN', dungeonMasterId);
  console.log(`Joined ${dungeonMasterId}'s room.`);
  // console.log('testing GET_ROOMS from DM handlers.');
  // socket.emit('GET_ROOMS');
}

module.exports = createRoom;