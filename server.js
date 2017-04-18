//dependencies
var express = require('express');
var bodyParser = require("body-parser");
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

//titles
var titles={};

//leverage built in js es6 promises
mongoose.Promise = Promise;

//initialize express
var app = express();

//use body parser
app.use(bodyParser.urlencoded({
  extended: false
}));

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

//TEST USER(set to unique in models)
var testUser = new User({
	name: "George Bird Grinnell"
});

testUser.save(function(err, doc) {
	if(err) {
		console.log(err);
	}
	else {
		console.log(doc);
	}
});


//------
//ROUTES
//------
//rendering to handlebars file
app.get("/", function(req, res) {

	res.render("index", {titles});
});

	//find all articles
	Article.find({}, function(error, doc) {
		if(error) {
			console.log(error);
		}

		
	});


//populate comments; save titles object so that we can see comments..
	Article.find({}).populate("comments")
	.exec(function(err, doc) {
		if(err) {
			res.send(err);
		}
		else {
			titles = doc
		}
	});

//scraping data with cheerio
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
	console.log("scrape success");
});


//create a comment w/POST route
app.post("/submit/:id", function(req, res) {
	//using comment model to make new note
	var newComment = new Comment(req.body);
	//save comment to mongoose
	newComment.save(function(err, doc) {
		if(err) {
			res.send(err);
		}
		else {
			Article.findOneAndUpdate({"id": req.params.id}, {$push: {"comments": doc._id}},
				{new: true}, function(err, newdoc) {
					if(err) {
						res.send(err);
					}
					else {
						res.send(newdoc);
							//get new article comments..
							Article.find({}, function(error, doc) {
							if(error) {
								console.log(error);
							}
							
							// res.json(doc);
							titles = doc
									
								});
					}

	});
		}
	});
	// res.redirect("/");
});






// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on" + PORT);
});