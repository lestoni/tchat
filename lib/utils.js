/**
 * Utility method.
 */

/**
 * stdout logger
 */

exports.logger = function logger(obj) {
  if (obj.type === 'error') {
    return process.stdout.write(
      '\t\033[0;36m [ \033[0;31m TChat \033[0;36m ]: \033[0;31m' +
      obj.message + '\n'
    );
  } else {
    return process.stdout.write(
      '\t\033[0;36m [ \033[0;32m TChat \033[0;36m ]: \033[0;32m' +
      obj.message + '\n'
    );
  }
};

/**
 * Helper message
 */

exports.cliHelper = function() {
  return ' TChat: minimal TCP chat server. \n' +
    '\n' +
    ' OPTIONS: \n' +
    '\n' +
    '\t-h --help     Show this help.\n' +
    '\t-s --secure   Secure connection(TLS/SSL).\n';
};

exports.tchatHelper = function() {
  return ' TChat: minimal TCP chat server. \n' +
    '\n' +
    'CHAT OPTIONS: \n' +
    '\t/username [username]    Change username\n' +
    '\t/quit                   Quit TChat.\n';
};