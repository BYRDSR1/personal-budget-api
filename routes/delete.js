const express = require("express");
const deleteRouter = express.Router();
const path = require("path");
const fs = require("fs");

//Envelopes array
const envelopes = require("../db/db.js");
//Functions
const {
	findEnvelope,
	deleteEnvelope,
	resetEnvelopeIds
} = require("../utils/funcs.js")

deleteRouter.get("/", (req, res, next) => {
	res.render(path.join(__dirname, "..", "views", "pages", "delete.ejs"), {
		name: "delete",
		info: `<h3 style="text-align:center">Enter an envelope's name or id</h3>`
	});
});

deleteRouter.post("/", (req, res, next) => {
	const name = req.body.name;
	const id = parseInt(req.body.id);
	if(id) {
		if(findEnvelope(id, "object")) {
			deleteEnvelope(id);
			resetEnvelopeIds();
			res.render(path.join(__dirname, "..", "views", "pages", "delete.ejs"), {
				name: "delete",
				info: `<h3 style="text-align:center">Envelope deleted successfully!</h3>`
			});
			next();
		} else {
			res.render(path.join(__dirname, "..", "views", "pages", "delete.ejs"), {
				name: "delete",
				info: `<h3 style="text-align:center">No envelope found with id ${id}</h3>`
			});
		}
	} else {
		if(findEnvelope(name)) {
			if(findEnvelope(name, "object").length > 1) {
			res.render(path.join(__dirname, "..", "views", "pages", "delete.ejs"), {
				name: "delete",
				info: `<h3 style="text-align:center">Two many envelopes with name ${name}, please use the id</h3>`
			});
			} else {
				deleteEnvelope(name);
				resetEnvelopeIds();
				res.render(path.join(__dirname, "..", "views", "pages", "delete.ejs"), {
					name: "delete",
					info: `<h3 style="text-align:center">Envelope deleted successfully!</h3>`
				});
			}
		} else {
			res.render(path.join(__dirname, "..", "views", "pages", "delete.ejs"), {
				name: "delete",
				info: `<h3 style="text-align:center">No envelope found with name ${name}</h3>`
			});
		}
	}
});

module.exports = deleteRouter;