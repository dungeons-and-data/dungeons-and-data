'use strict';


const startIo = (io) => {
  io.on('connection', socket => {
    console.log('IO server connection');

    socket.emit('proofOfLife', 'This is the proof of life');
  });
};

module.exports = startIo;

