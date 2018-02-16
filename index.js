var mongodb = require("mongodb");
var cool = require("cool-ascii-faces");

const bodyParser = require("body-parser");

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 80;

var db;
var URL = process.env.MONGODB_URI;

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .engine('html', require('ejs').renderFile)
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(express.static('public'))
  .get("/", (req, res) => res.render("pages/index"))
  .get("/cool", (request, response) => response.send(cool()))
  .get("/times", function(request, response) {
    var result = "";
    var times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) result += i + " ";
    response.send(result);
  })
  .get("/testdb", function(request, response) {
    mongodb.MongoClient.connect(URL, function(err, database) {
      if (err) {
        console.log("Unable to connect to the Server", err);
      } else {
        console.log("Connection established to", URL);
      }
      db = database
      express().listen(80, () => {
        console.log("listening on 80");
      });
    db.collection('users').find().toArray((err, result) => {
      if (err) return console.log(err)
        response.render("pages/db.ejs", {results: result})
        db.close();
      });
    })
    
  }).listen(PORT, () => console.log(`Listening on ${PORT}`));

