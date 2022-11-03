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
    response.status(201).send(book);
  } catch(error) {
    error.customMessage = 'Something went wrong when creating your book';
    console.error(error.customMessage + error);
    next(error);
  }
};

Handler.deleteBook = async (request, response, next) => {
  try {
    await Book.findByIdAndDelete(request.params.id);
    // Express response objects will not forward a response body if the response status code is (204) "No Content".
    response.status(200).send('your book is deleted!');
  } catch(error) {
    error.customMessage = 'Something went wrong when deleting your book: ';
    console.error(error.customMessage + error);
    next(error);
  }
};

Handler.updateBook = async (request, response, next) => {
  try {
    // Model.findByIdAndUpdate(id, updatedData, options)
    const updatedBook = await Book.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(200).send(updatedBook);
  } catch(error) {
    error.customMessage = 'Something went wrong when updating your book: ';
    console.error(error.customMessage + error);
    next(error);
  }
};

module.exports = Handler;