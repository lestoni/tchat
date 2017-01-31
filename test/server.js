var TChat = require('../lib/tChat');
var tchat = new TChat({
  port: 4001,
  maxConnections: 50,
  timeout: (60000 * 5)
});

tchat.start();