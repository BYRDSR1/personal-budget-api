const express = require("express");
const transferRouter = express.Router();
const path = require("path");
const fs = require("fs");

//Envelopes array
const envelopes = require("../db/db.js");
//Functions
const {
	findEnvelope,
	transferData
} = require("../utils/funcs.js")

transferRouter.get("/", (req, res, next) => {
	res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
		name: "transfer",
		info: `<h3 style="text-align:center">Transfer the amount from Envelope One to Envelope Two</h3>`
	});
});

transferRouter.post("/", (req, res, next) => {
	const nameOne = req.body.nameone;
	const idOne = parseInt(req.body.idone);
	const nameTwo = req.body.nametwo;
	const idTwo = parseInt(req.body.idtwo);
	
	if(idOne) {
		if(idTwo) {
			//idone && idtwo
			if(findEnvelope(idOne) && findEnvelope(idTwo)) {
				transferData(idOne, idTwo);
				res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
					name: "transfer",
					info: `<h3 style="text-align:center">Amount transfered!</h3>`
				});
			} else {
				if(!findEnvelope(idOne)) {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Can't find an envelope with id "${idOne}"</h3>`
					});
				} else {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Can't find an envelope with id "${idTwo}"</h3>`
					});
				}
			}
		} else if(nameTwo) {
			//idone && nametwo
			if(findEnvelope(idOne) && findEnvelope(nameTwo)) {
				if(findEnvelope(nameTwo, "object").length > 1) {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Too many envelopes with name "${nameTwo}", please use id</h3>`
					});
				}
				transferData(idOne, nameTwo);
				res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
					name: "transfer",
					info: `<h3 style="text-align:center">Amount transfered!</h3>`
				});
			} else {
				if(!findEnvelope(idOne)) {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Can't find an envelope with id "${idOne}"</h3>`
					});
				} else {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Can't find an envelope with name "${nameTwo}"</h3>`
					});
				}
			}
		} else {
			res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
				name: "transfer",
				info: `<h3 style="text-align:center">Please enter a name or id for Envelope Two</h3>`
			});
		}
	} else if(nameOne) {
		if(idTwo) {
			//nameone && idtwo
			if(findEnvelope(nameOne) && findEnvelope(idTwo)) {
				if(findEnvelope(nameOne, "object").length > 1) {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Too many envelopes with name "${nameOne}", please use id</h3>`
					});
				}
				transferData(nameOne, idTwo);
				res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
					name: "transfer",
					info: `<h3 style="text-align:center">Amount transfered!</h3>`
				});
			} else {
				if(!findEnvelope(nameOne)) {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Can't find an envelope with name "${nameOne}"</h3>`
					});
				} else {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Can't find an envelope with id "${idTwo}"</h3>`
					});
				}
			}
		} else if(nameTwo) {
			//nameone && nametwo
			if(findEnvelope(nameOne) && findEnvelope(nameTwo)) {
				if(findEnvelope(nameOne, "object").length > 1) {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Too many envelopes with name "${nameOne}", please use id</h3>`
					});
				}
				if(findEnvelope(nameTwo, "object").length > 1) {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Too many envelopes with name "${nameTwo}", please use id</h3>`
					});
				}
				transferData(nameOne, nameTwo);
				res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
					name: "transfer",
					info: `<h3 style="text-align:center">Amount transfered!</h3>`
				});
			} else {
				if(!findEnvelope(nameOne)) {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Can't find an envelope with name "${nameOne}"</h3>`
					});
				} else {
					res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
						name: "transfer",
						info: `<h3 style="text-align:center">Can't find an envelope with name "${nameTwo}"</h3>`
					});
				}
			}
		} else {
			res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
				name: "transfer",
				info: `<h3 style="text-align:center">Please enter a name or id for Envelope Two</h3>`
			});
		}
	} else {
		res.render(path.join(__dirname, "..", "views", "pages", "transfer.ejs"), {
			name: "transfer",
			info: `<h3 style="text-align:center">Please enter a name or id for Envelope One</h3>`
		});
	}
});

module.exports = transferRouter;