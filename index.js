/*
 * Primary file for API
 *
 */

// Dependencies
const http = require('http');
const url = require('url');

// The server should respond to all requests with a string
const server = http.createServer(function(req, res) {
  res.end('Hello World\n');
});

// Start the server, and have it listen on a port
server.listen(3000, function() {
  console.log('The server is listening on port 3000 now');
});
