// during the test, the env varr is set to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Book = require('..controllers/models/book.js');

// Require the dev-dependencies