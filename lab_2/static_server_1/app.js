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



app.use('/temp', express.static(`${__dirname}/temp`))
app.use('/html', express.static(`${__dirname}/html`))


app.get('/', function (req, res) {
  res.send('serv 1');
})


app.get('/temp', function (req, res) {
  res.send('temp');
})


app.get('/service1', function (req, res) {
  res.redirect("/");
});



var server = app.listen(9002, function () {
     var host = 'localhost'
     var port = server.address().port
     console.log('Listening at http://%s:%s ....', host, port)
});
 
