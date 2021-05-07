const express = require("express");
const searchRouter = express.Router();
const path = require("path");
const fs = require("fs");

//Envelopes array
const envelopes = require("../db/db.js");
//Functions
const {
	
} = require("../utils/funcs.js")
searchRouter.get("/", (req, res, next) => {
	res.sendFile(path.join(__dirname, "..", "public", "search.html"));
});

searchRouter.post("/", (req, res, next) => {
	res.send("/search");
	next();
});

module.exports = searchRouter;