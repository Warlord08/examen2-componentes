'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	LocationSchema = new Schema({
	county: String,
	district: String,
	geo: String
});

module.exports = mongoose.model('Location', LocationSchema);