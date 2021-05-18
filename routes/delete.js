const express = require("express");
const deleteRouter = express.Router();
const path = require("path");
const fs = require("fs");

//Envelopes array
const envelopes = require("../db/db.js");
//Functions
const {
	findEnvelope
} = require("../utils/funcs.js")

deleteRouter.get("/", (req, res) => {
	res.render(path.join(__dirname, "..", "views", "pages", "delete.ejs"), {
		name: "delete"
	});
});

module.exports = deleteRouter;