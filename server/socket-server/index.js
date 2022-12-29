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

      socket.on('TABLE', (payload) => {
        socket.to(dungeonMasterId).emit('TABLE', payload);
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
      socket.on('ACTION', (payload, roll) => {
        socket.to(dungeonMasterId).emit('ACTION', payload, roll);
      });
      socket.on('CLASS', (payload) => {
        socket.emit('CLASS', payload);
      });
      socket.on('CHARACTER', (payload) => {
        socket.emit('CHARACTER', payload);
      });
      socket.on('FAVORABLE', (payload) => {
        socket.to(dungeonMasterId).emit('FAVORABLE', payload);
      });
      socket.on('UNFAVORABLE', (payload) => {
        socket.to(dungeonMasterId).emit('UNFAVORABLE', payload);
        socket.emit('UNFAVORABLE_HERO');
      });
      socket.on('GAME_OVER', (payload) => {
        const response =
          payload === 'loss'
            ? 'Hero has had to many unfavorable action and has decided to flee!'
            : 'Victory! The Hero has gained some experience!';
        socket.to(dungeonMasterId).emit('GAME_OVER', response);
        socket.emit('GAME_OVER', '');
        socket.emit('GAME_OVER_DM', '');
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
