'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/');

let currentRooms;

socket.on('ROOMS', function(payload) {
  console.log('This is payload in ROOMS', payload);
  currentRooms = payload.rooms;
  console.log('Here is currentRooms:', currentRooms);
});

function getListOfRooms(){
  socket.emit('GET_ROOMS');
}

function joinRoom(dungeonMasterId) {
  socket.emit('JOIN', dungeonMasterId);
  console.log(`Joined ${dungeonMasterId}'s room.`);
}

module.exports = {getListOfRooms, joinRoom};