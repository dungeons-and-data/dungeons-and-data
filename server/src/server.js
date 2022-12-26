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

let DATABASE_URL;
if (process.env.NODE_ENV === 'test') {
  DATABASE_URL = process.env.DATABASE_URL_TEST;
} else {
  DATABASE_URL = process.env.DATABASE_URL_LIVE;
}

const notFound = require('../error-handlers/404');
const errorHandler = require('../error-handlers/500');
const userRouter = require('../routes/userRoutes');
const startIo = require('../socket-server');


mongoose.set('strictQuery', true);
async function connectToMongoDB() {
  try {
    await console.log(`Connected to MongoDB at ${'DATABASE_URL'}`);
    await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, bufferCommands: false });
  } catch (error) {
    console.error(error);
  }
}

connectToMongoDB();

startIo(io);

app.use(express.json());
app.use(cors());

app.use(userRouter);

app.get('/', (req, res, next) => {

  res.status(200).send('Proof of life');
});

app.all('*', notFound);
app.use(errorHandler);

function start() {
  server.listen({
    host: SERVER_URL,
    port: PORT,
  }, () => console.log(`listening on port: ${PORT}`));
}
module.exports = { start, server, connectToMongoDB };