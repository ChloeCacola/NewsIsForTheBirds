var mongoose = require('mongoose');

//create schema class
var Schema = mongoose.Schema;

//create user schema
var UserSchema = new Schema({

	//unique name
	name: {
		type: String,
		unique: true
	},
	//attached comments to user with ref to Comment model
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

//create user model
var User = mongoose.model("User", UserSchema);

//export model
module.exports = User;