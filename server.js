let express = require('express');
// create instance of express
let app = express();

// require modules
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
// let router = express.Router();

let port = 8080;
let book = require('./controllers/routes/book.js');

// get db location
let config = require('config');
// db options
let options = {
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    },
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  }
};
// db connection
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error:'));

// don't show the log when it is test
// if (config.util.getEnv('NODE_ENV') !== 'test') {
//   // use morgan to log at command line so as to not interfere with test output
//   app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
// }

// header options
// parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// end points
app.get('/', (req, res) => res.json({ message: 'Welcome to our Bookstore!' }));

// router.get('/book', book.getBooks);
// route.post('/book', book.postBook);

// router.get('/book/:id', book.getBook);
// router.delete('/book/:id', book.deleteBook);
// router.put('/book/:id', book.updateBook);
app.route("/book")
    .get(book.getBooks)
    .post(book.postBook);
app.route("/book/:id")
    .get(book.getBook)
    .delete(book.deleteBook)
    .put(book.updateBook);

app.listen(port);
console.log('Listening on port ' + port);

// export the server for testing purposes
module.exports = app;