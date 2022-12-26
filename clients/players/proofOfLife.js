const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/');

socket.on('proofOfLife', proof => console.log(proof));