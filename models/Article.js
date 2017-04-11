var mongoose = require('mongoose');
require('mongoose-type-url');

//create class
var Schema = mongoose.Schema;

//create Article schema
var ArticleSchema = new Schema({
	title: {
		type: String,
		unique: true
	},
	url: {
		type: mongoose.SchemaTypes.Url
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