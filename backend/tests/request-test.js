var assert = require('assert');
var http = require('http');
var server = require("../src/index.js");

const PORT = process.env.PORT || 9000

describe('Test server', () => {
  after(function() {
    server.stop();
  });

  it('GET weather', done => {
    console.log("URL = " + `http://localhost:${PORT}/api/weather`);
    http.get(`http://localhost:${PORT}/api/weather`, res => {
      assert.equal(200, res.statusCode);
      res.setEncoding('utf8');
      res.on('data', function (body) {
        body = JSON.parse(body);
        assert.ok(body.hasOwnProperty('id'), 'body.id missing!');
        assert.ok(body.hasOwnProperty('main'), 'body.id missing!');
        assert.ok(body.hasOwnProperty('description'), 'body.id missing!');
        assert.ok(body.hasOwnProperty('icon'), 'body.id missing!');
      });
      done();
    });
  });

  it('GET forecast', done => {
    console.log("URL = " + `http://localhost:${PORT}/api/forecast`);
    http.get(`http://localhost:${PORT}/api/weather`, (err, res, body) => {
      assert.equal(200, res.statusCode);
      res.setEncoding('utf8');
      res.on('data', function (body) {
        body = JSON.parse(body);
        assert.ok(body.hasOwnProperty('list'), 'body.list missing!');
      });
      done();
      done();
    });
  });
});
