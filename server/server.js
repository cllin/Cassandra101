var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {
                               requestCallback(request, response);});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");

function requestCallback(request, response) {
    var urlData = url.parse(request.url, true);
    var action = urlData.pathname;
    
    var database = require('./database.js');

    if (action == '/insert') {
        database.insert(urlData.query, response);
    } else if (action == '/select_all') {
        database.selectAll(response);
    } else if (action == '/clear_all') {
        database.clearAll(response);
    } else {
        response.writeHead(404, {
                           'Content-Type': 'text/plain',
                           'Access-Control-Allow-Origin' : '*',
                           'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                           });
        
        response.end('The requested resource could not be found but may be available again in the future. Subsequent requests by the client are permissible.' + '\r\n');
    }
}

function exit(code) {
    if (code == 0) {
        console.log('Process has been successful, closing...');
    } else {
        console.log('Process has failed, closing...');
    }
    
    process.exit(code);
}