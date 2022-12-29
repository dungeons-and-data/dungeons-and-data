'use strict';


function createRoom(dungeonMasterId, socket) {
  socket.emit('JOIN', dungeonMasterId);
  console.log(`Joined ${dungeonMasterId}'s room.`);
  // console.log('testing GET_ROOMS from DM handlers.');
  // socket.emit('GET_ROOMS');
}

module.exports = createRoom;