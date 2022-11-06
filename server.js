'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Handler = require('./modules/handlers');
const verifyUser = require('./modules/auth');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.MONGO_CONNECTION)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Mongoose is connected');
});

app.get('/test', (request, response) => {

  response.send('test request received')
})

app.use(verifyUser);

app.get('/books', Handler.getBooks);
app.post('/books', Handler.createBook);
app.delete('/books/:id', Handler.deleteBook);
app.put('/books/:id', Handler.updateBook);
app.get('/user', Handler.handleGetUser); 

app.listen(PORT, () => console.log(`listening on ${PORT}`));
