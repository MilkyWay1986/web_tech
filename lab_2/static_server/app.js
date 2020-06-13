var express = require('express');
var app = express();
app.set('view engine', 'ejs');



const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const urlencodedParser = bodyParser.urlencoded({extended: false});

var expressLogging = require('express-logging'),
    logger = require('logops');
app.use(expressLogging(logger));


app.use('/img', express.static(`${__dirname}/static/img`))

app.use('/html', express.static(`${__dirname}/static/html`))

app.get('/', function (req, res) {
  res.redirect("/html");
});

app.get('/static-server', function (req, res) {
  res.redirect("/");
});




var server = app.listen(9001, function () {
     var host = 'localhost'
     var port = server.address().port
     console.log('Listening at http://%s:%s ....', host, port)
});
 
