var assert = require('assert'),
  net = require('net'),
  spawn = require('child_process').spawn;

var utils = require('../lib/utils'),
  connect = require('../lib/connect'),
  user = require('../lib/user'),
  TChat = require('../lib/tChat');


describe('#Utilities', function() {

  it('should export logger function', function() {
    assert.equal('function', typeof utils.logger);
  });

  it('should export cliHelper function', function() {
    assert.equal('function', typeof utils.cliHelper);
  });

  it('should export tchatHelper function', function() {
    assert.equal('function', typeof utils.tchatHelper);
  });
});

describe('#TChat', function() {
  describe('constructor', function() {

    it('should return constructor', function() {
      var tchat = new TChat();

      assert.equal('function', typeof TChat);
      assert.equal(true, tchat instanceof TChat);
    });

    it('should take options argument', function() {
      var options = {
          port: 4001,
          maxConnections: 50,
          timeout: (60000 * 5)
        },
        tchat = new TChat(options);

      assert.notEqual(3000, tchat.port);
      assert.strictEqual(50, tchat.maxConnections);
      assert.equal('number', typeof tchat.timeout);
    });

  });

  describe('instance defaults', function() {
    var tchat = new TChat();

    it('should have a default port', function() {
      assert.equal(3000, tchat.port);
      assert.equal('number', typeof tchat.port);
    });

    it('should have a array type db', function() {
      after(function() {
        tchat.db = [];
      });

      tchat.db.push(1);

      assert.equal(true, Array.isArray(tchat.db));
      assert.equal(1, tchat.db.length);

      tchat.db.pop();
      assert.equal(0, tchat.db.length);
    });

    it('should have net.Server instance', function() {
      assert.notEqual(undefined, typeof tchat.options);
      assert.equal(true, tchat.server instanceof net.Server);
    });

    it('should have options object', function() {
      assert.notEqual(undefined, typeof tchat.options);
    });

  });

  describe('#client connection', function() {
    var child;

    afterEach(function() {
      child.kill();
    });

    it('should log connection established', function(done) {
      child = spawn('node', ['server.js']);

      child.stdout.on('data', function(data) {
        data = data.toString();
        assert.notEqual(-1, data.indexOf('4001'));
        done();
      });
    });

  });

});