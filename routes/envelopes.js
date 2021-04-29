const express = require("express");
const envelopesRouter = express.Router();
const path = require("path");

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
	const newEnvelope = addToEnvelopes(name, amount);
	res.status(201);
	res.redirect("/envelopes");
	next();
})

module.exports = envelopesRouter;