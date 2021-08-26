const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
	api: {
		type: String,
	},
	cors: {
		type: String,
	},
	https: {
		type: String,
	},
	auth: {
		type: String,
	},
	description: {
		type: String,
	},
	link: {
		type: String,
	},
	category: {
		type: String,
	},
});

module.exports = mongoose.model('apischema', apiSchema);
