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
	res.sendFile(path.join(__dirname, "..", "public", "envelopes.html"));
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
		//res.status(500).send("ERROR 500 INTERNAL SERVER ERROR");
	});
	const newEnvelope = addToEnvelopes(name, amount, count);
	res.status(201);
	res.redirect("/envelopes");
	next();
})

module.exports = envelopesRouter;