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
      let rooms = Array.from(io.sockets.adapter.rooms.keys()); 
      socket.emit('ROOMS', rooms);
    });
  });
};

module.exports = startIo;

