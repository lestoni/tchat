/**
 * Client
 */

/**
 * Load dependencies
 */
var tchatHelper = require( './utils' ).tchatHelper;

var regex = /^(\/username|\/quit)(.*)/;

/**
 * client connected successfully
 */

function changeUsername( client, db, username ) {
  var old = client.username;

  client.username = username;
  broadcastMessage( client, db, old + ' changed username\n' );
}

function disconnectUser( client, db ) {
  broadcastMessage( client, db, 'left TChat\n' );
  client.end();
  db.splice( db.indexOf( client ), 1 );

  console.log( db.length );
}

function broadcastMessage( client, db, data ) {
  var remoteClient;

  for ( var i = 0, len = db.length; i < len; i += 1 ) {
    remoteClient = db[ i ];
    if ( remoteClient.username !== client.username ) {
      remoteClient.write( '[ ' + client.username + ' ]: ' + data );
    }
  }
}


exports.connected = function( client, db, fn ) {
  // Add the client to the db
  db.push( client );

  client.write( tchatHelper() );

  client.write( '[ ' + client.username + ' ]: ' +
    ' Welcome to TChat:)\n' );

  broadcastMessage( client, db, 'joined TChat :)\n' );

  if ( fn ) {
    return fn();
  }
};

/**
 * Broadcasting to other clients
 */

exports.broadcast = function( client, db, data ) {
  var match = data.match( regex ),
    test = !match ? data : match[ 1 ];

  switch ( test ) {
    case '/username':
      return changeUsername( client, db, match[ 2 ] );
    case '/quit':
      return disconnectUser( client, db );
    default:
      return broadcastMessage( client, db, test );
  }
};