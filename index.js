var mongodb = require("mongodb");
var cool = require("cool-ascii-faces");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
var app = express();
/** socket io */
users = {};
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);
  // app.listen(PORT, () => console.log(`Listening on ${PORT}`));
server.listen(4000,() => console.log('Server running on port 4000'));




if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
var db;
// var URL = process.env.MONGODB_URI;

//module 4
var db=require('./models/db.js');
var session=require('express-session');
var user=require('./routes/user.js');
var story=require('./routes/story.js');
var routes=require('./routes/route.js');


  app.use(express.static(path.join(__dirname, "public")))
  app.set("views", path.join(__dirname, "views"))
  app.set("view engine", "ejs")
  app.engine('html', require('ejs').renderFile)
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(express.static('public'))
  app.use(session({secret:"qazwsxedcrfvtgbyhnujm123qa5fryz",resave: true, saveUninitialized: true}))
  app.get('/Module4',routes.index)
  app.get('/Module4/stories',story.stories)
  app.get('/Module4/register',routes.register)
  app.post('/Module4/newUser',user.doCreate)
  app.get('/Module4/registrationSuccessful',user.registrationSuccessful)
  app.get('/Module4/login',routes.login)
  app.post('/Module4/authenticate',user.login)
  app.get('/Module4/new-story',routes.newStory)
  app.post('/Module4/add-story',story.addStory)
  app.get('/Module4/stories/:story',story.getStory)
  app.post('/Module4/stories/:slug/saveComment',story.saveComment)
  app.get('/Module4/techStack',routes.techStack)
  app.get('/Module4/logout',user.logout)
  app.get("/", (req, res) => res.render("pages/index"))
  app.get("/Module1", (req, res) => res.render("pages/quotes"))
  app.get("/Module2/:city", function(req, res) {
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
  app.get("/Module3", (req, res) => res.render("pages/module3"))
  app.get("/Module6", (req, res) => res.render("pages/sockets"))
  app.get("/cool", (request, response) => response.send(cool()))
  app.get("/times", function(request, response) {
    var result = "";
    var times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) result += i + " ";
    response.send(result);
  })
  app.get("/testdb", function(request, response) {
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
    
  })


  io.sockets.on('connection',function(socket){

    console.log("A New Connection Established");

    socket.on('new user',function(data,callback){
      if(data in users){
        // console.log("Username already taken");
        callback(false);
      }else{
        // console.log("Username available");
        callback(true);
        socket.nickname=data;
        users[socket.nickname]=socket;
        updateNicknames();
      }
    });


    function updateNicknames(){
      io.sockets.emit('usernames',Object.keys(users));
    }


    socket.on('send message',function(data,callback){
      var msg=data.trim();

      // if(msg.substr(0,1) === '@'){
      //   msg=msg.substr(1);
      //   var ind=msg.indexOf(' ');
      //   if(ind !== -1){
      //     var name=msg.substring(0,ind);
      //     var msg=msg.substring(ind+1);
      //      if(name in users){
      //         users[name].emit('whisper',{msg:msg,nick:socket.nickname});
      //         socket.emit('private',{msg:msg,nick:name});
      //       console.log("Whispering !");
      //     }else{
      //       callback("Sorry, "+name+" is not online");
      //     }
      //   }else{
      //     callback("Looks like you forgot to write the message");
      //   }

      // }

      //  else{
       console.log("Got Message :"+data)
       io.sockets.emit('new message',{msg:msg,nick:socket.nickname});
        //  }
    });


    socket.on('disconnect',function(data){
          if(!socket.nickname) return;
          delete users[socket.nickname];
          updateNicknames();
    });


});


