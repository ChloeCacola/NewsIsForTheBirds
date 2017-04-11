//dependencies
var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var exphbs = require("express-handlebars");
//models
var Article = require('./models/Article.js');
var Comment = require('./models/Comment.js');
var User = require('./models/User.js');
//port
var PORT = 3000;

//leverage built in js es6 promises
mongoose.Promise = Promise;

//initialize express
var app = express();

//handlebars settings
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//public folder
app.use(express.static("public"));


//db config with mongoose
mongoose.connect("mongodb://localhost/forthebirds");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
	console.log("mongoose success");
})

//main route 
app.get("/", function(req, res) {
	res.render("index");
});

//routes
app.get("/", function(req,res) {

	request("http://www.audubon.org/news/birds-news", function(err, response, html){

		var $ = cheerio.load(html);

		$("h4.editorial-card-title").each(function(i, element) {
			//result object for storing scraped data
			var result = {};

			result.title = $(element).text();
			// result.url = $(element).children().attr("href");

			//new article using Article model and result object
			var article = new Article(result);

			//save article to db
			article.save(function(err, doc) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(doc);
				}
			});
		});
	});
	console.log("scrape success");
});

app.get("/all", function(req, res) {
	Article.find({}, function(error, doc) {
		if(error) {
			console.log(error);
		}
		else {
			res.json(doc);
		}
	});
});



// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on" + PORT);
});