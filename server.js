// Dependecies
// =========================================================
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// =========================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {

connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cake_db"
});
}

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});


// Use Handlebars to render the main index.html page with  cakes in it.
// =========================================================
app.get("/", function(req, res) {
  connection.query("SELECT * FROM cakes;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { cakes: data });
  });
});


// Create a new cake
// =========================================================
app.post("/cakes", function(req, res) {
  connection.query("INSERT INTO cakes (cakeName) VALUES (?)", [req.body.cakeName], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new movie
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});


// Retrieve all cakes
// =========================================================
app.get("/cakes", function(req, res) {
  connection.query("SELECT * FROM cakes;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});


// Delete a cake
// =========================================================
app.delete("/cakes/:id", function(req, res) {
  connection.query("DELETE FROM cakes WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    } else if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
      console.log(req.params.id + req.params.cakeName);

    }
  });
});

app.listen(port, function() {
  console.log("listening on port", port);
});
