const express = require("express");
const envelopesRouter = express.Router();
const path = require("path");

//Envelopes array
const envelopes = require("../db/db.js");
console.log(envelopes);
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
/*
envelopesRouter.param("name", (req, res, next, id) => {
	req.body.name = req.params.name;
	console.log(req.body.name);
	next();
});

envelopesRouter.param("amount", (req, res, next, id) => {
	req.body.amount = req.params.amount;
	console.log(req.body.amount);
	next();
});
*/
envelopesRouter.post("/", (req, res, next) => {
	const name = req.body.name;
	const amount = req.body.amount;
	console.log("POST route variables: ", name, amount, "\n");
	const newEnvelope = addToEnvelopes(name, amount);
	console.log(newEnvelope);
	console.log(envelopes[2]);
	res.status(201);
	res.redirect("/envelopes");
	next();
})

module.exports = envelopesRouter;