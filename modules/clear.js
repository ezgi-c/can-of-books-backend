require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION);

const Book = require('../models/book');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async _ => {
  console.log('We\'re connected!');
  await Book.deleteMany({});
  db.close();
});

