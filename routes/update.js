const express = require("express");
const updateRouter = express.Router();
const path = require("path");
const fs = require("fs");

//Envelopes array
const envelopes = require("../db/db.js");
//Functions
const {
	findEnvelope
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
	if(id) {
		if(!findEnvelope(id, "object")) {
    	res.render(path.join(__dirname, "..", "views", "pages", "update.ejs"), {
		    name: "update",
		    findError: `<h3 style="text-align:center">Unable to find an item with id "${id}"</h3>`
	    });
		} else {
      
		}
	} else {
		if(!findEnvelope(name, "object")) {
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
			
		}
	}
	next();
});

module.exports = updateRouter;findError: '<h3 style="text-align:center">There Are More Than One Envelopes with That Name, Please Use the Id</h3>'