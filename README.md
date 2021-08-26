# Public APIs List Crawler

Crawl the public list api and store in mongodb database

## Installation

Use the package manager [npm](https://docs.npmjs.com/cli/v7/commands/npm-install) to install foobar.

```bash
npm install
```

## Step to run code

```bash
npm install
node app.js
```

## schema detail and table
There is only one table(collections) that is apischema whose schema are as follow
```javascript
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
```

## What is done from “Points to achieve” and the number of entries in all your tables 
1. use of promises in javascript to make pi request
2.  when the API return 429 i.e too many requests I make the program sleep for 1 minute. 
3. if the API returns 403 that means the token expired so I request the new token from the server.
4. batch insert is used to insert the data in the database.

## What is not done from “Points to achieve”
1. oops concept was not used
## What would you improve if given more days
1. I will dockerize the code for easy installation
