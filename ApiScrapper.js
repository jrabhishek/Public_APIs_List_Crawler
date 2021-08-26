const mongoose = require('mongoose');
const apiSchema = require('./models/apiSchema');
const axios = require('axios');

let token = '';
const BASEURL = 'https://public-apis-api.herokuapp.com/api/v1';
const TIMELIMIT = 1000 * 60;
let category = [];

const makeSleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

const getToken = async () => {
	try {
		const response = await axios.get(`${BASEURL}/auth/token`);
		console.log(response);
		if (response.status === 200) token = response.data.token;
	} catch (err) {
		console.log(err.response);
		if (err.response.status === 429) {
			console.log('ewdee');
			await makeSleep(TIMELIMIT);
			console.log('ewd');
			await getToken();
		}
	}
};

const getCategories = async () => {
	await getToken();
	let page = 1;
	while (true) {
		try {
			const response = await axios.get(`${BASEURL}/apis/categories`, {
				params: {
					page,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status === 200) {
				console.log(response.data);
				category = [...category, ...response.data.categories];
				page++;
				if (response.data.categories.length === 0) {
					break;
				}
			}
		} catch (err) {
			if (err.response.status === 403) await getToken();
			if (err.response.status === 429) await makeSleep(TIMELIMIT);
		}
	}
};

let apiData = [];
module.exports.getAllData = async () => {
	await getCategories();

	for (let i = 0; i < category.length; i++) {
		let page = 1;
		while (true) {
			try {
				const response = await axios.get(`${BASEURL}/apis/entry`, {
					params: {
						page,
						category: category[i],
					},
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.status === 200) {
					if (response.data.categories.length === 0) {
						await insertInDb();
						break;
					}
					const responseData = response.data.categories.map((responseItem) => {
						const demoStructure = {
							api: responseItem.API,
							cors: responseItem.Cors,
							https: responseItem.HTTPS,
							auth: responseItem.Auth,
							description: responseItem.Description,
							link: responseItem.Link,
							category: responseItem.Category,
						};
						return demoStructure;
					});
					//console.log(response.data);
					apiData = [...apiData, ...responseData];
					page++;
				}
			} catch (error) {
				//console.log(error);
				if (error.response.status === 403) await getToken();
				if (error.response.status === 429) await makeSleep(TIMELIMIT);
			}
		}
	}
	// category.forEach(async (element, index) => {});
};

const insertInDb = async () => {
	try {
		const id_ = await apiSchema.insertMany(apiData);
		apiData = [];
		console.log('some data inserted in db');
		//process.exit();
	} catch (e) {
		console.log(e);
		//process.exit();
	}
};
