'use strict';

const Book = require('../models/book');
const Handler = {};
 Handler.getBooks = async (request, response, next) => {
  try {
    // if I pass in an empty object, that tells Mongoose to get ALL the documents from the database
    const books = await Book.find({ email: request.user.email });
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
    const book = await Book.create({ ...request.body, email: request.user.email });
    response.status(201).send(book);
  } catch(error) {
    error.customMessage = 'Something went wrong when creating your book';
    console.error(error.customMessage + error);
    next(error);
  }
};

Handler.deleteBook = async (request, response, next) => {
  const { id } = request.params;
  try {
    const book = await Book.findOne({ _id: id, email: request.user.email });
    if (!book) response.status(400).send('unable to delete book');
    else {
      await Book.findByIdAndDelete(id);
      // Express response objects will not forward a response body if the response status code is (204) "No Content".
      response.status(204).send('your book is deleted!');
    }
  } catch(error) {
    error.customMessage = 'Something went wrong when deleting your book: ';
    console.error(error.customMessage + error);
    next(error);
  }
};

Handler.updateBook = async (request, response, next) => {
  const { id } = request.params;
  try {
    // Model.findByIdAndUpdate(id, updatedData, options)
    const book = await Book.findOne({ _id: id, email: request.user.email  });
    if (!book) response.status(400).send('unable to update book');
    else{
      const updatedBook = await Book.findByIdAndUpdate(id, { ...request.body, email: request.user.email }, { new: true, overwrite: true });
    response.status(200).send(updatedBook);
    }
  } catch(error) {
    error.customMessage = 'Something went wrong when updating your book: ';
    console.error(error.customMessage + error);
    next(error);
  }
};

Handler.handleGetUser = (req, res) => {
  console.log('Getting the user');
  res.send(req.user);
};

module.exports = Handler;