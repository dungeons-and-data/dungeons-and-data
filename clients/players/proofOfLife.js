const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/');
// const login = require('../UI/login')
socket.on('proofOfLife', proof => console.log(proof));

// login().then(data => console.log(data));