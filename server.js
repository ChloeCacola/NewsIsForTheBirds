//dependencies
var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

//initialize express
var app = express();


//db config with mongoose
mongoose.connect("mongodb://localhost/forthebirds");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
	console.log("success");
})

//main route 
app.get("/", function(req, res) {
	res.send("this works");
});


//more routes below..

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});