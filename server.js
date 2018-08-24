var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/mongoosing");


app.get("/scrape", function(req, res) {
  
  axios.get("https://www.theartnewspaper.com/").then(function(response) {
   
    var $ = cheerio.load(response.data);

    $("a.cp-link").each(function(i, element) {
     
      var result = {};


      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

     
      db.News.create(result)
        .then(function(dbNews) {
         
          console.log(dbNews);
        })
        .catch(function(err) {

          return res.json(err);
       
        });
    });

 
    res.send("Scrape Complete");
  });
});


app.get("/news", function(req, res) {

  db.News.find({})
    .then(function(dbNews) {
     
      res.json(dbNews);
    })
    .catch(function(err) {
     
      res.json(err);
    });
});


app.get("/news/:id", function(req, res) {

  db.News.findOne({ _id: req.params.id })
 
    .populate("comment")
    .then(function(dbNews) {
    
      res.json(dbNews);
    })
    .catch(function(err) {
   
      res.json(err);
    });
});


app.post("/news/:id", function(req, res) {
  
  db.Comments.create(req.body)
    .then(function(dbComment) {
     
      return db.News.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
    })

    .then(function(dbNews) {
    
      res.json(dbNews);
    })
    .catch(function(err) {
     
      res.json(err);
    });
});


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
