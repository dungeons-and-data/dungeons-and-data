'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/');

// Getting list of rooms

let currentRooms;

function getListOfRooms(){
  socket.emit('GET_ROOMS');
}

// join a room

function joinRoom(dungeonMasterId) {
  socket.emit('JOIN', dungeonMasterId);
  console.log(`Joined ${dungeonMasterId}'s room.`);
}

module.exports = {getListOfRooms, joinRoom, socket};
