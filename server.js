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

//scrape
var scrape = require("./controllers/scrape.js");

//port
var PORT = process.env.PORT || 3000;

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
//local db
var databaseURI = "mongodb://localhost/forthebirds";
if(process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
} 
else {
	mongoose.connect(databaseURI);
}
//end db config

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

	scrape();

res.render("index");
	});

app.get("/mynews", function(req, res) {
		//find all articles; sort alphabetically
	Article.find({}).sort({"title": 1}).exec(function(error, doc) {
		if(error) {
			console.log(error);
		}
			titles = doc;
	});


	//populate comments; save titles object so that we can see comments..
	Article.find({}).sort({"title":1}).populate("comments")
	.exec(function(err, doc) {
		if(err) {
			res.send(err);
		}
		else {
			titles = doc
			res.render("mynews", {titles});
		}
});

		
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
			//THIS IS WHAT NEEDS TO BE UPDATED FOR ARTICLE TO REFER TO COMMENT
			Article.findOneAndUpdate({"_id": req.params.id}, {$push: {"comments": doc._id}},
				{new: true}, function(err, newdoc) {
					if(err) {
						res.send(err);
					}
					else {
						res.redirect("/mynews");
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
});

//delete a comment
app.post("/delete/:id", function(req, res) {
	console.log(req.body._id);

	//delete comment from article
	Article.update({"_id": req.params.id}, {$pullAll: {"comments": [req.body._id]}}, function(err, doc) {
		if(err) {
			console.log(err)
		}
	});

	//delete comment entirely
	Comment.findByIdAndRemove(req.body._id, function(err, doc) {
		if(err) {
			console.log(err);
		}
		else {
			res.send(doc);
		}
	});
});




// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on" + PORT);
});