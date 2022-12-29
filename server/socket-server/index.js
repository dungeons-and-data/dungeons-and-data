/** @format */

'use strict';

const startIo = (io) => {
  io.on('connection', (socket) => {
    console.log('IO server connection');

    socket.emit('proofOfLife', 'This is the proof of life');

    socket.on('JOIN', (dungeonMasterId) => {
      socket.join(dungeonMasterId);
      console.log(`Joined room: ${dungeonMasterId}`);
      socket.to(dungeonMasterId).emit('USER_CONNECTED', 'New user connected.');
      socket.emit('JOIN', dungeonMasterId);

      socket.on('GAME_STARTED', () => {
        socket
          .to(dungeonMasterId)
          .emit('GAME_STARTED', 'The game is starting!');
      });

      socket.on('GAME_CHOSEN', (payload) => {
        socket
          .to(dungeonMasterId)
          .emit('GAME_CHOSEN', dungeonMasterId + ' chose ' + payload + '!');
      });

      socket.on('CHAPTER_CHOSEN', (payload) => {
        socket.to(dungeonMasterId).emit('CHAPTER_CHOSEN', payload);
      });

      socket.on('PROBLEM', (payload) => {
        socket.to(dungeonMasterId).emit('PROBLEM', payload);
      });
    });

    socket.on('GET_ROOMS', () => {
      let availableRooms = [];
      let rooms = io.sockets.adapter.rooms;

      for (const [key, value] of rooms.entries()) {
        if (!value.has(key)) {
          availableRooms.push(key);
        }
      }

      socket.emit('ROOMS', availableRooms);
    });
  });
};

module.exports = startIo;
