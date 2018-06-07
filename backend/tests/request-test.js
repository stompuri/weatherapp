var assert = require('assert');
var http = require('http');
var server = require("../src/index.js");

const PORT = process.env.PORT || 9000

describe('Test server', () => {
  after(function() {
    server.stop();
  });

  it('GET weather', done => {
    http.get(`http://localhost:${PORT}/api/weather`, res => {
      assert.equal(200, res.statusCode);
      res.setEncoding('utf8');
      res.on('data', function (body) {
        body = JSON.parse(body);
        assert.ok(body.hasOwnProperty('weather'), 'body.weather missing!');
        assert.ok(body.weather[0].hasOwnProperty('id'), 'body.weather[0].id missing!');
        assert.ok(body.weather[0].hasOwnProperty('main'), 'body.weather[0].main missing!');
        assert.ok(body.weather[0].hasOwnProperty('description'), 'body.weather[0].description missing!');
        assert.ok(body.weather[0].hasOwnProperty('icon'), 'body.weather[0].icon missing!');
      });
      done();
    });
  });

  it('GET forecast', done => {
    http.get(`http://localhost:${PORT}/api/forecast`, res => {
      assert.equal(200, res.statusCode);
      res.setEncoding('utf8');
      res.on('data', function (body) {
        body = JSON.parse(body);
        assert.ok(body.hasOwnProperty('list'), 'body.list missing!');
      });
      done();
    });
  });
});
