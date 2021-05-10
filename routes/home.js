const express = require("express");
const homeRouter = express.Router();
const path = require("path");

homeRouter.get("/", (req, res) => {
	res.render(path.join(__dirname, "..", "views", "pages", "index.ejs"), {
		name: "home"
	});
});

homeRouter.get("/scripts/:file", (req, res) => {
	const file = req.params.file;
	res.sendFile(path.join(__dirname, "..", "views", "pages", "scripts", file));
});

module.exports = homeRouter;