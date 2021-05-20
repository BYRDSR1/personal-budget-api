const express = require("express");
const transferRouter = express.Router();
const path = require("path");
const fs = require("fs");

//Envelopes array
const envelopes = require("../db/db.js");

transferRouter.get("/", (req, res, next) => {
	res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
		name: "transfer",
		info: ""
	});
});

module.exports = transferRouter;