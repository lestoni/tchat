/**
 * Load Dependencies.
 */

// Core modules
var net = require('net');

// User define modules
var connect = require('./connect');


// Application level variables
var counter = 0;


function CreateServer(options) {
  var self = this;

  this.options = (options = options || {});
  this.port = options.port || 3000;
  this.maxConnections = options.maxConnections || 100;
  this.timeout = options.timeout || (5 * 3600 * 1000);
  this.server = null;
  this.db = [];


  this.server = net.createServer();
  this.server.maxConnections = this.maxConnections;
  this.server.on('listening', self._serverListener.bind(self));

  this.server.on('connection', self._clientConnected.bind(self));

  this.server.on('close', self._closeServer.bind(self));

  this.server.on('error', self._errorHandler.bind(self));

}


CreateServer.prototype.start = function(fn) {
  this.server.listen(this.port);

  if ('function' === typeof fn) {
    fn(this.port);
  }
};


/**
 * Handle `error` event.
 */

CreateServer.prototype._errorHandler = function(err) {
  connect.errorHandler(err, this.db);

  this.server.close();
};

/**
 * Handle `close` event.
 *   - When server closes
 */

CreateServer.prototype._closeServer = function() {
  connect.closed(this.db);
};

/**
 * Handle `connection` connection
 */

CreateServer.prototype._clientConnected = function(client) {
  var self = this;
  client.setEncoding('utf8');

  connect.instance({
    db: self.db,
    client: client,
    counter: counter
  });
};

/**
 * Handle `listen` event
 */
CreateServer.prototype._serverListener = function() {
  connect.listen(this.port);
};

/**
 * Exports
 */

module.exports = CreateServer;