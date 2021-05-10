const express = require("express");
const searchRouter = express.Router();
const path = require("path");
const fs = require("fs");

//Envelopes array
const envelopes = require("../db/db.js");
//Functions
const {
	findEnvelope
} = require("../utils/funcs.js")

searchRouter.get("/", (req, res, next) => {
	res.sendFile(path.join(__dirname, "..", "public", "search.html"));
});

searchRouter.post("/", (req, res, next) => {
	const name = req.body.name;
	const id = parseInt(req.body.id);
	if(id) {
		res.send(findEnvelope(id));
	} else {
		res.send(findEnvelope(name));
	}
	next();
});

module.exports = searchRouter;