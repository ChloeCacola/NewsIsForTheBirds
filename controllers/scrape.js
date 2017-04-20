var request = require('request');
var cheerio = require('cheerio');

var Article = require('../models/Article.js');
var Comment = require('../models/Comment.js');

var scrape = function() {
	audubon = "http://www.audubon.org/news/birds-news"
	//scraping data with cheerio
request(audubon, function(err, response, html){

	var $ = cheerio.load(html);

		$("h4.editorial-card-title").each(function(i, element) {
			//result object for storing scraped data
			var result = {};

			result.title = $(element).text();
			result.url = "http://www.audubon.org" + $(element).children().attr("href");

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
}

module.exports = scrape;