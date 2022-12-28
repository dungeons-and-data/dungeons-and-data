'use strict';


const startIo = (io) => {
  io.on('connection', socket => {
    console.log('IO server connection');

    socket.emit('proofOfLife', 'This is the proof of life');

    socket.on('JOIN', (dungeonMasterId) => {
      socket.join(dungeonMasterId);
      console.log(`Joined room: ${dungeonMasterId}`);
      console.log('list of rooms in JOIN', io.sockets.adapter.rooms);
      socket.emit('JOIN', dungeonMasterId);
    });

    socket.on('GET_ROOMS', () => {
      let availableRooms = [];
      let rooms = io.sockets.adapter.rooms;

      for (const [key, value] of rooms.entries()) {
        console.log(key, value);
        if (!value.has(key)) {
          availableRooms.push(key);
        }
      }
      socket.emit('ROOMS', availableRooms);
    },
    );
  });
};

module.exports = startIo;

