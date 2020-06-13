var express = require('express');
var app = express();
app.set('view engine', 'ejs');



const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var expressLogging = require('express-logging'),
    logger = require('logops');
app.use(expressLogging(logger));


app.use('/img', express.static(`${__dirname}/static/img`))


//***********************************************************************************************************//
const { Client } = require("pg");
const postgresUser = "postgres";
const postgresDb = "lab_1";
const postgresPass = "1";
var connectionString = `postgres://${postgresUser}:${postgresPass}@localhost:5432/${postgresDb}`;
const client = new Client({
  connectionString: connectionString
});
client.connect();
//***********************************************************************************************************//


app.get('/cancel', function (req, res) {
  res.redirect("/");
});
 

//*********************ADD NEW*****************************************************************************//
app.get('/', function(req, res) {
  client.query("SELECT * FROM students", function(err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.render("index", { title: "Students", data: result.rows });
  });
});

app.get('/add', function (req, res) {
  res.render("add", { title: "Add Students"});
});

app.post('/save', save = function(req, res) {
  var cols = [req.body.data.name, req.body.data.address, req.body.data.email, req.body.data.phone];
  client.query(
    "INSERT INTO students(name, address, email, phone) VALUES($1, $2, $3, $4) RETURNING *",
    cols,
    function(err, result) {
      if (err) {
        console.log("Error. Not Saved! : %s ", err);
      }
      res.redirect("/");
    }
  );

});
//*********************ADD NEW*****************************************************************************//



//*********************EDIT*****************************************************************************//
app.get('/edit/:id', function(req, res) {
  var id = req.params.id;

  client.query("SELECT * FROM students WHERE id=$1", [id], function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.render("edit", { title: "Edit", data: result.rows, id: id });
  });
});


app.post('/edit_save', function(req, res) {
  var cols = [
    req.body.data.name,
    req.body.data.address,
    req.body.data.email,
    req.body.data.phone,
    req.body.id
  ];
  console.log(cols)

  client.query(
    "UPDATE students SET name=$1, address=$2, email=$3, phone=$4 WHERE id=($5)::int",
    cols,
    function(err, result) {
      if (err) {
        console.log("Error. Updating : %s ", err);
      }
      res.redirect("/");
    }
  );
});
//*********************EDIT*****************************************************************************//



//*********************DELETE*****************************************************************************//
app.get('/delete/:id', function(req, res) {
  var id = req.params.id;
 
  client.query("DELETE FROM students WHERE id=$1", [id], function(err, rows) {
    if (err) {
      console.log("Error deleting : %s ", err);
    }
    res.redirect("/");
  });
});
//*********************DELETE*****************************************************************************//


 
var server = app.listen(900, function () {
     var host = 'localhost'
     var port = server.address().port
     console.log('Listening at http://%s:%s ....', host, port)
});
 
