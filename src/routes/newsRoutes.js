const Router = require("express").Router;
const router = Router();

const handlebars = require("handlebars")
const path = require("path")
const fs = require("fs");

const News = require("../controllers/news.controller");
const newsController = new News();

router.get("/", (req, res) => {
	let responsePromise;

	if (!req.params.search || req.params.search === '') {
		responsePromise = newsController.getAll();
	} else {
		responsePromise = newsController.getQuery(req.params.search);
	}

	responsePromise
		.then((response) => {
			res.send(response.data.articles);
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
