/**
 * TCP Chat server.
 *
 * Features:
 *   - Universal chatroom.
 *   - Ability to change nickname.
 *   - Keeps connection alive but disconnects idle sockets(timeout=2mins).
 *   - *Secure connection over TLS/SSL.
 *   -
 */

/**
 * Load modules
 */

var TChat = require('../lib/tchat');


var tchat = new TChat({
  port: 4001,
  maxConnections: 50,
  timeout: (60000 * 5)
});

tchat.start();

// 3075666555666307566655321
