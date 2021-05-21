const express = require("express");
const envelopesRouter = express.Router();
const path = require("path");
const fs = require("fs");

const count = require("../db/count.js")

//Envelopes array
const envelopes = require("../db/db.js");

//Helper function
const {
	convertEnvelopesToHTML,
  addToEnvelopes
} = require("../utils/funcs.js");

envelopesRouter.get("/", (req, res, next) => {
	res.render(path.join(__dirname, "..", "views", "pages", "envelopes.ejs"), {
		name: "envelopes"
	});
});

envelopesRouter.get("/list", (req, res, next) => {
  res.json({"data":convertEnvelopesToHTML(envelopes)});
});

envelopesRouter.post("/", (req, res, next) => {
	const name = req.body.name;
	const amount = req.body.amount;	
	const data = "const count = " + (count + 1) + ";module.exports = count;"
	fs.writeFile(path.join(__dirname, "..", "db", "count.js"), data, err => {
		console.log(err);
	});
	const newEnvelope = addToEnvelopes(name, amount, count);
	res.status(201).render(path.join(__dirname, "..", "views", "pages", "envelopes.ejs"), {
		name: "envelopes"
	});
})

module.exports = envelopesRouter;