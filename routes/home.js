const express = require("express");
const homeRouter = express.Router();
const path = require("path");

homeRouter.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

homeRouter.get("/scripts/:file", (req, res) => {
	const file = req.params.file;
	res.sendFile(path.join(__dirname, "..", "public", "scripts", file));
});
module.exports = homeRouter;