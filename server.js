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

