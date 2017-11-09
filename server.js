let express = require('express');
// create instance of express
let app = express();

let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');

let port = 8080;
let book = ('./app/routes/book');

// get db location
let config = require('config');
// db options
let options = {
  server: {
    {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      },
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
if (config.util.getEnv('NODE_ENV') !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// end points
app.get('/', (req, res) => res.json({ message: 'Welcome to our Bookstore!' }));

app.route('/book')
  .get(book.getBooks)
  .post(book.postBook);
app.route('/book/:id')
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook);

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app;