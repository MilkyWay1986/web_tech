var http = require('http');
var fs = require('fs');






var server = http.createServer(function(req, res) {
  if(req.url === '/hack') {
   res.writeHead(200, {'Content-Type': 'text/html'});
   fs.createReadStream(__dirname + '/static/html/index.html').pipe(res);
  } else if(req.url === '/') {
   res.writeHead(200, {'Content-Type': 'text/html'});
   fs.createReadStream(__dirname + '/static/html/hack.txt').pipe(res);
  }
});

server.listen(902, '127.0.0.1');
console.log('Listen port: 902...');
