require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const DATABASE_URL = process.env.DATABASE_URL;
const notFound = require('../error-handlers/404');
const errorHandler = require('../error-handlers/500');
const userRouter = require('../routes/userRoutes');


mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, bufferCommands: false }, (error, connection) => {
  if (error) {
    console.error(error);
  } else {
    const port = connection.connections[0].port;
    console.log(`Connected to MongoDB at ${'port'}:${port}`);
  }
});
app.use(express.json());
app.use(cors());

app.use(userRouter);

app.get('/', (req, res, next) => {

  res.status(200).send('Proof of life');
});

app.use('*', notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
}
module.exports = { start, app };