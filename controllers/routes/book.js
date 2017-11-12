let mongoose = require('mongoose');
let Book = require('../models/book');

/*
 * GET /book route to retrieve all the books
 */
function getBooks(req, res) {
  // query the db and if no errors, send all the books
  let query = Book.find({});
  query.exec((err, books) => {
    if(err) res.send(err);
    // if no errors, send them back to the client
    res.json(books);
  });
}

/*
 * POST /book route to save a new book
 */
function postBook(req, res) {
  // create new book (from our model)
  var newBook = new Book(req.body);
  // save it into the DB
  newBook.save((err, book) => {
    if (err) {
      res.send(err);
    } else {
     // if no err, send it back to the client
     res.json({message: 'Book successfully added!', book});
    }
  });
}

/*
 * GET /book/:id route to retrieve a book given its id
 */
function getBook(req, res) {
  Book.findById(req.params.id, (err, book) => {
    if (err) res.send(err);
    // if no errors, send it back to the client
    res.json(book);
  });
}

/*
 * DELETE /book/:id route to retrieve a book given its id
 */
function deleteBook(req, res) {
  Book.remove({_id: req.params.id}, (err, result) => {
    if (err) console.error('You had a delete error: ', err);
    res.json({ message: 'Book successfully deleted!', result });
  });
}

/*
 * PUT /book/:id to update a book given its id
 */
 function updateBook(req, res) {
  Book.findById({_id: req.params.id}, (err, book) => {
    if(err) res.send(err);
    // Object.assign overrides the common properties of book
    Object.assign(book, req.body).save((err, book) => {
      if(err) res.send(err);
      res.json({ message: 'Book updated!', book});
    })
  });
 }

// export all functions using ES6
module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };