'use strict';

const mongoose = require('mongoose');
const Book = require('../models/book');
require('dotenv').config();

// connecting to our mongo database called "cats-database" using mongoose
mongoose.connect(process.env.MONGO_CONNECTION);
// this is where the connection actually happens
const db = mongoose.connection;
// is turning the db on and checking for any errors
db.on('error', console.error.bind(console, 'connection error:'));
// if my db is connected properly, I should see this console.log after "listening on PORT 3001"
db.once('open', function() {
  console.log('Mongoose is connected for seeding...');
});


// create a function that seeds the database
async function seed() {
  console.log('seeding database...');

  const myBook = new Book({
    title:'Cat in the hat' ,
    description: 'good',
    status: false,
    src: 'https://images.unsplash.com/photo-1626914623652-67f36cc25536?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHIuJTIwc2V1c3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    email: 'christopherwlopez89@gmail.com'
  });

   await myBook.save(function (err) {
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

   await Book.create({
    title:'Kindred' ,
    description: 'science fiction',
    status: false,
    src: 'https://variety.com/wp-content/uploads/2022/01/Kindred-FX.jpg?w=681&h=383&crop=1',
    email: 'ezgicoban3261@gmail.com'

  });


   await Book.create({
    title:'The Shinning' ,
    description: 'Horror',
    status: false,
    src: 'https://images.unsplash.com/photo-1574099698592-9df0e9f19f3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amFjayUyMG5pY2hvbHNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    email: 'christopherwlopez89@gmail.com'
  });


  console.log('done seeding!');

  mongoose.disconnect();
}

seed();