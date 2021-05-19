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

deleteRouter.get("/", (req, res, next) => {
	res.render(path.join(__dirname, "..", "views", "pages", "delete.ejs"), {
		name: "delete",
		info: `<h3 style="text-align:center">Enter an envelope's name or id</h3>`
	});
	next();
});

deleteRouter.post("/", (req, res, next) => {
	const name = req.body.name;
	const id = parseInt(req.body.id);
	if(id) {
		if(findEnvelope(id)) {
			//delete envelope
		} else {
			//no envelope with id
		}
	} else {
		if(findEnvelope(name)) {
			if(findEnvelope(name).length > 1) {
				//Too many envelopes with name
			} else {
				//delete envelope
			}
		} else {
			//no envelope with name
		}
	}
});

module.exports = deleteRouter;