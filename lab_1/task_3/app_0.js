var http = require('http');
var fs = require('fs');






var server = http.createServer(function(req, res) {
  if(req.url === '/') {
   res.writeHead(200, {'Content-Type': 'text/html'});
   fs.createReadStream(__dirname + '/static/html/1.html').pipe(res);
  }
});

server.listen(900, '127.0.0.1');
console.log('Listen port: 900...');
