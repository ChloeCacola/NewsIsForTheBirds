var mongoose = require('mongoose');

//create class
var Schema = mongoose.Schema;

//create comment schema
var CommentSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},

	comment: {
		type: String
	}
});

//make comment model
var Comment = mongoose.model("Comment", CommentSchema);

//export model
module.exports = Comment;