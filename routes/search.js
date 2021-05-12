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
	res.render(path.join(__dirname, "..", "views", "pages", "search.ejs"), {
		name: "search",
		data: null
	});
});

searchRouter.post("/", (req, res, next) => {
	const name = req.body.name;
	const id = parseInt(req.body.id);
	if(id) {
		if(!findEnvelope(id)) {
			res.render(path.join(__dirname, "..", "views", "pages", "search.ejs"), {
			  name: "search",
			  data: `Unable to find an item with id "${id}"`
		  });
		} else {
		  res.render(path.join(__dirname, "..", "views", "pages", "search.ejs"), {
			  name: "search",
			  data: findEnvelope(id)
		  });
		}
	} else {
		if(!findEnvelope(name)) {
			res.render(path.join(__dirname, "..", "views", "pages", "search.ejs"), {
			  name: "search",
			  data: `Unable to find an item with name "${name}"`
		  });
		} else {
		  res.render(path.join(__dirname, "..", "views", "pages", "search.ejs"), {
			  name: "search",
			  data: findEnvelope(name)
		  });
		}
	}
	next();
});

module.exports = searchRouter;