'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	HerbSchema = new Schema({
	name: String,
	use: String,
	aspect	: String,
	image : String,
	extGrade : String
});

module.exports = mongoose.model('Herb', HerbSchema);