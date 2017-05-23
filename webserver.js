var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {
    fs.readFile('./dist/index.html', function(err, content){
      if(err) {
      } else {
        response.writeHead(200, { 'Content-Type' : 'text/html; charset=UTF-8' });
        response.write(content);
        response.end();
      }
    });
}).listen(1999, '127.0.0.1');
