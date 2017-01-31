/**
 * Load dependencies.
 */

var logger = require('./utils').logger,
  user = require('./user');


var COUNTER = 1,
  TIMEOUT = (60000 * 5);

/**
 * server listening logger
 */

exports.listen = function(port) {
  logger({
    type: 'info',
    message: 'TChat server listening on port ' + port
  });
};

/**
 * Server closing
 */

exports.closed = function(connections) {
  for (var i = 0, len = connections.length; i < len; i += 1) {
    connections[i].write('Server is terminating :(');
  }
  logger({
    type: 'info',
    message: 'TChat server is terminating...'
  });
};

/**
 *  Error handling
 */

exports.errorHandler = function(err, connections) {
  for (var i = 0, len = connections.length; i < len; i += 1) {
    connections[i].write('Internal server error :(');
  }

  logger({
    info: 'error',
    message: err.message
  });
};

/**
 * connecting sockets.
 */

exports.instance = function(options) {
  var client = options.client,
    db = options.db,
    addr = client.remoteAddress,
    port = client.remotePort;

  // Assign client temporary UID
  client.username = 'guest-' + COUNTER++;

  logger({
    info: 'info',
    message: addr + ':' + port + ' connected to server'
  });

  user.connected(client, db, function() {
    /**
     * Timeout idle clients.
     */

    client.setTimeout(TIMEOUT, function() {
      client.write('logging you out...');
      client.end();
    });

    /**
     * Client/Socket data broadcasting
     */
    client.on('data', function(data) {
      user.broadcast(client, db, data);
    });

    /**
     * Client/Socket error handling
     */
    client.on('error', function(err) {
      logger({
        info: 'error',
        message: addr + ':' + port + ' discconnected to server'
      });
    });

    /**
     * Client/Socket closed.
     *   - Follows Client/Socket error
     */
    client.on('close', function() {
      logger({
        info: 'error',
        message: addr + ':' + port + ' disconnected to server'
      });

    });

  });

};