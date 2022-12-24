require('dotenv').config();


const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

const mongoose = require('mongoose');

const cors = require('cors');
const PORT = process.env.PORT || 3002;
const SERVER_URL = process.env.SERVER_URL || 'localhost';
const DATABASE_URL = process.env.DATABASE_URL;
const notFound = require('../error-handlers/404');
const errorHandler = require('../error-handlers/500');
const userRouter = require('../routes/userRoutes');
const startIo = require('../socket-server');


mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, bufferCommands: false }, (error, connection) => {
  if (error) {
    console.error(error);
  } else {
    const port = connection.connections[0].port;
    console.log(`Connected to MongoDB at ${'port'}:${port}`);
  }
});

startIo(io);

app.use(express.json());
app.use(cors());

app.use(userRouter);

app.get('/', (req, res, next) => {

  res.status(200).send('Proof of life');
});

app.use('*', notFound);
app.use(errorHandler);

function start() {
  server.listen({
    host: SERVER_URL,
    port: PORT,
  }, () => console.log(`listening on port: 3000`));
}
module.exports = { start };