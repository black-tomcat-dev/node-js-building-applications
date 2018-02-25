var mongodb = require("mongodb");
var cool = require("cool-ascii-faces");


const bodyParser = require("body-parser");

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
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
  .get("/Module1", (req, res) => res.render("pages/quotes"))
  .get("/Module2/:city", function(req, res) {
    var cityLabel = "";
    var city = "";
    if (req.params.city == "london"){
      city = "london";
      cityLabel = "London"
    }else if (req.params.city == "paris"){
      city = "paris";
      cityLabel = "Paris"
    }else if (req.params.city == "newyork"){
      city = "newyork";
      cityLabel = "New York"
    }else if (req.params.city == "madrid"){
      city = "madrid";
      cityLabel = "Madrid"
    }
    // var cityURL = 
    // "https://api.flickr.com/services/feeds/photos_public.gne?tags=" + cityLabel 
    // + "&tagmode=any&format=json&jsoncallback=?"
    res.render("pages/city", {City:city, 
      Label:cityLabel});
    
  })
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
      // express().listen(3000, () => {
      //   console.log("listening on 3000");
      // });
    db.collection('users').find().toArray((err, result) => {
      if (err) return console.log(err)
        response.render("pages/db.ejs", {results: result})
        db.close();
      });
    })
    
  }).listen(PORT, () => console.log(`Listening on ${PORT}`));

