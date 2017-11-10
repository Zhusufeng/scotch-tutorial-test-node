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