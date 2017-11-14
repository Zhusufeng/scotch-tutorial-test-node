// during the test, the env varr is set to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Book = require('../controllers/models/book.js');

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

// our parent block
describe('Books', () => {
  beforeEach(done => { // before each test, we empty the database
    Book.remove({}, (err) => {
      done();
    });
  });

  /*
  *  Test the /GET route
  */
  describe('/GET book', () => {
    it('should GET all the books', (done) => {
      chai.request(server)
        .get('/book')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);

          done();
        });
    });
  });
});