const express = require("express");
const envelopesRouter = express.Router();

//Envelopes array
const envelopes = require("../db/db.js");

//Helper function
const convertEnvelopeToString = require("../utils/funcs.js");

envelopesRouter.get("/", (req, res, next) => {
	console.log( typeof envelopes);
	res.send(convertEnvelopeToString(envelopes));
});

module.exports = envelopesRouter;