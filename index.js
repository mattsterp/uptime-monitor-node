/*
 * Primary file for the API
 * 
 */

// Depenedencies
var http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;

// The server should respond to all requests with a string

var server = http.createServer(function(req, res) {
  // Get the url and parse it
  var parsedUrl = url.parse(req.url, true);
  // Get the url path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the query string as an object
  var queryStringObect = parsedUrl.query;

  // Get the HTTP method
  var method = req.method.toLowerCase();

  // Get the headers as an object
  var headers = req.headers;

  // Get the payload, if any
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function(data) {
    buffer += decoder.write(data);
  });
  req.on("end", function() {
    buffer += decoder.end();

    // choose the handler this request should go to.  If one is not found use the notFound hanlder.
    var chosenHabndler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // construct the data object to send to the hanlder 
    var  data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject': queryStringObect,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };

    // Route the request to the handler specified in the router
    chosenHabndler(data,function(stastCode,payload){
      // use the status code called back by the hanlder, or defualt to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // use the payload called back by the hanlder, or defualt to an empty object. 
      payload = typeof(payload) == 'object' ? payload : {};
      
      // convert the payload to a string 
      var payloadString = JSON.stringify(payload);

      // return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
       // Send the resposnse
      res.end(payloadString);

      // Log the request path
    console.log('Returning this response', statusCode,payloadString);
    });

  });
});

// start the server, and have it listen on port 3000
server.listen(3000, function() {
  console.log("The server is listening on port 3000 now");
});

// Define the handlers
var handlers = {};

// Sample handler 
handlers.sample = function(data,callback){
  // callback a http status code, and a payload object
  callback(406,{'name': 'sample-hanlder'});
};

// Not found hanlder 
handlers.notFound = function(data,callback){
  callback(404);
};


// Define a request router 
var router = {
  'sample' : handlers.sample
};
