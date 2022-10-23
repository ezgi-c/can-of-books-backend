'use strict';

const Book = require('../models/book');

const getBooks = async (request, response, next) => {
  try {
    // if I pass in an empty object, that tells Mongoose to get ALL the documents from the database
    const books = await Book.find({});
    response.status(200).send(books);
  } catch(error) {
    console.error(error);
    next(error);
  }
};

module.exports = getBooks;