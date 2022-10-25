'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// this is our Object Relational Mapping
const bookSchema = new Schema({
  // schema types
  title: String,
  description: String,
  status: String,
  src: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;