var mongoose = require('mongoose');

//create class
var Schema = mongoose.Schema;

//create Article schema
var ArticleSchema = new Schema({
	title: {
		type: String,
		unique: true
	},
	url: {
		type: String,
		unique: true
	},
	//attached comments to article with ref to Comment model
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

//create model
var Article = mongoose.model("Article", ArticleSchema);

//export model
module.exports = Article;