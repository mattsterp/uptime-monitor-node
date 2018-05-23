/*
 * Primary file for the API
 * 
 */

// Depenedencies
var http = require("http");
var url = require("url");

// The server should respond to all requests with a string

var server = http.createServer(function(req, res) {
  // Get the url and parse it
  var parsedUrl = url.parse(req.url, true);
  // Get the url path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the HTTP method
  var method = req.method.toLowerCase();

  // Send the resposnse
  res.end("Hello World\n");

  // Log the request path
  console.log("Request recieved on path: " + trimmedPath+ ' with method: '+method);
});

// start the server, and have it listen on port 3000
server.listen(3000, function() {
  console.log("The server is listening on port 3000 now");
});
