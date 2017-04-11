var mongoose = require('mongoose');

//create class
var Schema = mongoose.Schema;

//create Article schema
var ArticleSchema = new Schema({
	title: {
		type: String
	},
	commments: [{
		text: String,
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
    }]
});

//create model
var Article = mongoose.model("Article", ArticleSchema);

//export model
module.exports = Article;