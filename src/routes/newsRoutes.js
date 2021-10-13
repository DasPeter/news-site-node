const Router = require("express").Router;
const router = Router();

const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");

const News = require("../controllers/news.controller");
const newsController = new News();

router.get("/", (req, res) => {
	let responsePromise;

	if (!req.query.search || req.query.search === "") {
		responsePromise = newsController.getAll();
	} else {
		responsePromise = newsController.getQuery(req.query.search);
	}

	responsePromise
		.then((response) => {
			const src = fs.readFileSync(
				path.join(__dirname, "..", "views", "news.handlebars"),
				"utf-8"
			);
			const template = handlebars.compile(src);
			const view = template({
				news: response.data.articles,
			});
			res.send(view);
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
