var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var methodOverride = require('method-override')


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

app.use(methodOverride('_method'))

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))


//***********************************************************************************************************//
const { Client } = require("pg");
const postgresUser = "super";
const postgresDb = "lab_1";
const postgresPass = "1";
var connectionString = `postgres://${postgresUser}:${postgresPass}@localhost:5432/${postgresDb}`;
const client = new Client({
  connectionString: connectionString
});
client.connect();
//***********************************************************************************************************//


app.post('/cancel', function (req, res) {
  res.redirect("/students");
});

app.get('/students', function (req, res) {
  client.query("SELECT * FROM students", function(err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.render("index", { title: "Students", data: result.rows });
  });
});
 

//*********************ADD NEW*****************************************************************************//


app.post('/students', function (req, res) {
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
      res.redirect("/students");
    }
  );

});
//*********************ADD NEW*****************************************************************************//



//*********************EDIT*****************************************************************************//


app.put('/students/:id', function(req, res) {
  var id = parseInt(req.params.id);
console.log("ID=",id);
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


app.post('/edit-save', function(req, res) {
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
      res.redirect("/students");
    }
  );
});
//*********************EDIT*****************************************************************************//



//*********************DELETE*****************************************************************************//

app.delete("/students/:id", urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    var id = req.body.id;
    client.query("DELETE FROM students WHERE id=$1", [id], function(err, rows) {
    if (err) {
      console.log("Error deleting : %s ", err);
    }
    res.redirect("/students");
  });

});

//*********************DELETE*****************************************************************************//


 
var server = app.listen(7777, function () {
     var host = 'localhost'
     var port = server.address().port
     console.log('Listening at http://%s:%s ....', host, port)
});
 
