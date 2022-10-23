'use strict';

const mongoose = require('mongoose');
const Book = require('../models/book');

// connecting to our mongo database called "cats-database" using mongoose
mongoose.connect('mongodb://localhost:27017/books-database', {useNewUrlParser: true, useUnifiedTopology: true});
// this is where the connection actually happens
const db = mongoose.connection;
// is turning the db on and checking for any errors
db.on('error', console.error.bind(console, 'connection error:'));
// if my db is connected properly, I should see this console.log after "listening on PORT 3001"
db.once('open', function() {
  console.log('Mongoose is connected for seeding...');
});

const Book = require('../models/book');

// create a function that seeds the database
async function seed() {
  console.log('seeding database...');

  const myBook = new Book({
    title:'Cat in the hat' ,
    description: 'good',
    status: ' amazing '
  });

  myBook.save(function (err) {
    if (err) console.error(err);
    else console.log('saved Cat in the hat in database!');
  });

  // alternativly...
// try {
//     console.log('testing if this works');
//     await Book.create({
//       title:'Cat in the hat' ,
//       description: 'good',
//       status: ' amazing',
//     });
// } catch (error){
//     console.log(error);
// }

  const myBook1 = new Book({
    title:'kindred' ,
    description: 'science fiction',
    status: 'five stars'
  });

  myBook1.save(function (err) {
    if (err) console.error(err);
    else console.log('saved book in database!');
  });

  const myBook2 = new Book({
    title:'The Shinning' ,
    description: 'Horror',
    status: 'five stars'
  });

  myBook2.save(function (err) {
    if (err) console.error(err);
    else console.log('saved the shinning in database!');
  });

  console.log('done seeding!');

  mongoose.disconnect();
}

seed();