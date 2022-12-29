/** @format */

'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/');

socket.emit('JOIN', 'user1');
socket.on('USER_CONNECTED', (payload) => {
  console.log(payload);
});

socket.on('GAME_STARTED', (payload) => {
  console.log(payload);
});

socket.on('GAME_CHOSEN', (payload) => {
  console.log(payload);
});

socket.on('CHAPTER_CHOSEN', (payload) => {
  console.log(payload);
});

socket.on('PROBLEM', (payload) => {
  console.log(payload);
});
