var mongodb = require("mongodb");
var cool = require("cool-ascii-faces");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;


if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
var db;
var URL = process.env.MONGODB_URI;

//module 4
var db=require('./models/db.js');
var session=require('express-session');
var user=require('./routes/user.js');
var story=require('./routes/story.js');
var routes=require('./routes/route.js');

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .engine('html', require('ejs').renderFile)
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(express.static('public'))
  .use(session({secret:"qazwsxedcrfvtgbyhnujm123qa5fryz",resave: true, saveUninitialized: true}))
  .get('/Module4',routes.index)
  .get('/Module4/stories',story.stories)
  .get('/Module4/register',routes.register)
  .post('/Module4/newUser',user.doCreate)
  .get('/Module4/registrationSuccessful',user.registrationSuccessful)
  .get('/Module4/login',routes.login)
  .post('/Module4/authenticate',user.login)
  .get('/Module4/new-story',routes.newStory)
  .post('/Module4/add-story',story.addStory)
  .get('/Module4/stories/:story',story.getStory)
  .post('/Module4/stories/:slug/saveComment',story.saveComment)
  .get('/Module4/techStack',routes.techStack)
  .get('/Module4/logout',user.logout)
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
    var cityURL = "https://pixabay.com/api/?key=8158793-b6b28f3581a06e835f99844f5&q=" + city
    + "&image_type=photo"
    res.render("pages/city", {City:cityURL, 
      Label:cityLabel});
    
  })
  .get("/Module3", (req, res) => res.render("pages/module3"))
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
    
  }).listen(PORT, () => console.log(`Listening on ${PORT}`))


