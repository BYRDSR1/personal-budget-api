const express = require("express");
const homeRouter = express.Router();
const path = require("path");

homeRouter.get("/:path", (req, res) => {
	const file = req.params.path;
	res.sendFile(path.join(__dirname, file));
});

module.exports = homeRouter;