const mongoose = require('mongoose');
const uri = `mongodb+srv://admin:admin@cluster0.khe4p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const scrapper = require('./ApiScrapper');
mongoose
	.connect(uri, {})
	.then((res) => {
		console.log('Connected to database, Server Starting');
		scrapper.getAllData();
	})
	.catch((err) => {
		console.log(err);
	});
