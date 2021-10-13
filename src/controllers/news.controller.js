const axios = require("axios").default;
const APIKEY = process.env.APIKEY;

class News {
	getAll() {
		return axios.get(
			`https://newsapi.org/v2/top-headlines?country=us&apiKey=${APIKEY}`
		);
	}
	getQuery(query) {
		// query = encodeURI(query);
		return axios.get(
			`https://newsapi.org/v2/everything?q=${query}&apiKey=${APIKEY}`
		);
	}
}

module.exports = News;
