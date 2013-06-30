// require http modules and and reading from the file system
var http = require('http');
    fs = require('fs');
    // escapes html code in strings
    sanitize = require('validator').sanitize;

// create the server
var app = http.createServer(function (request, response){
  fs.readFile('client.html', 'utf-8', function(error, data){
  // takes 3 parameters, name of the file we want to read, encoding and the callback function
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();
  });
}).listen(1337);

// create server side socket.io instance
var io = require('socket.io').listen(app);

// set up the event
// event handler that fires evertime a client sockets connects to the servers
io.sockets.on('connection', function(socket) {
  socket.on('message_to_server', function(data) {
    var escaped_message = sanitize(data["message"]).escape();
    io.sockets.emit('message_to_client',{ message: escaped_message });
  });
});
