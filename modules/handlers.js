'use strict';

const Book = require('../models/book');
const Handler = {};
 Handler.getBooks = async (request, response, next) => {
  try {
    // if I pass in an empty object, that tells Mongoose to get ALL the documents from the database
    const books = await Book.find({});
    response.status(200).send(books);
  } catch(error) {
    error.customMessage = 'Something went wrong when getting your book';
    console.error(error.customMessage + error);
    next(error);
  }
};

Handler.createBook = async (request, response, next) => {
  try {
    // if I pass in an empty object, that tells Mongoose to get ALL the documents from the database
    const book = await Book.create(request.body);
    response.status(200).send(book);
  } catch(error) {
    error.customMessage = 'Something went wrong when creating your book';
    console.error(error.customMessage + error);
    next(error);
  }
};
module.exports = Handler;