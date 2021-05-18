const express = require("express");
const updateRouter = express.Router();
const path = require("path");
const fs = require("fs");

//Envelopes array
const envelopes = require("../db/db.js");
//Functions
const {
	findEnvelope,
	updateEnvelope
} = require("../utils/funcs.js")

updateRouter.get("/", (req, res, next) => {
	res.render(path.join(__dirname, "..", "views", "pages", "update.ejs"), {
		name: "update",
		findError: null
	});
});

updateRouter.post("/", (req, res, next) => {
	const name = req.body.name;
	const id = parseInt(req.body.id);
	const newName = req.body.newname;
	const newAmount = req.body.newamount;
	
	if(id) {
		if(!findEnvelope(id, "object")) {
    	res.render(path.join(__dirname, "..", "views", "pages", "update.ejs"), {
		    name: "update",
		    findError: `<h3 style="text-align:center">Unable to find an item with id "${id}"</h3>`
	    });
		} else {
			if(!newAmount && !newName) {
				res.render(path.join(__dirname, "..", "views", "pages", "update.ejs"), {
					name: "update",
					findError: `<h3 style="text-align:center">Please enter a new amount or name</h3>`
				});
			} else {
				const newEnvelope = {name: newName, amount: newAmount};
				updateEnvelope(id, newEnvelope);
				res.status(201).render(path.join(__dirname, "..", "views", "pages", "update.ejs"), {
					name: "update",
					findError: `<h3 style="text-align:center">Envelope updated!</h3>`
				});
			}
		}
	} else {
		if(name === "") {
			res.render(path.join(__dirname, "..", "views", "pages", "update.ejs"), {
		    name: "update",
		    findError: `<h3 style="text-align:center">Please enter a name or id</h3>`
	    });
		} else if(!findEnvelope(name, "object")) {
    	res.render(path.join(__dirname, "..", "views", "pages", "update.ejs"), {
		    name: "update",
		    findError: `<h3 style="text-align:center">Unable to find an item with name "${name}"</h3>`
	    });
		} else if(findEnvelope(name, "object").length > 1) {
      res.render(path.join(__dirname, "..", "views", "pages", "update.ejs"), {
		    name: "update",
		    findError: '<h3 style="text-align:center">There Are More Than One Envelopes with That Name, Please Use the Id</h3>'
	    });
		} else {
			if(!newAmount && !newName) {
				res.render(path.join(__dirname, "..", "views", "pages", "update.ejs"), {
					name: "update",
					findError: `<h3 style="text-align:center">Please enter a new amount or new name</h3>`
				});
			} else {
				const newEnvelope = {name: newName, amount: newAmount};
				updateEnvelope(name, newEnvelope);
				res.status(201).render(path.join(__dirname, "..", "views", "pages", "update.ejs"), {
					name: "update",
					findError: `<h3 style="text-align:center">Envelope updated!</h3>`
				});
			}
		}
	}
	next();
});

module.exports = updateRouter;findError: '<h3 style="text-align:center">There Are More Than One Envelopes with That Name, Please Use the Id</h3>'