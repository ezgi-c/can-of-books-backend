'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const getBooks = require('./modules/handlers');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

mongoose.connect('mongodb://localhost:27017/books-database', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Mongoose is connected');
});

app.get('/test', (request, response) => {

  response.send('test request received')
})

app.get('/books', getBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
