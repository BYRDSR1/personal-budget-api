const express = require("express");
const resetRouter = express.Router();
const path = require("path");
const fs = require("fs");

resetRouter.get("/", (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "pages", "reset.ejs"), {
	  name: "reset"
	});
});

resetRouter.post("/", (req, res, next) => {
	const dbData = 'const envelopes = [{"name": "Bills", "amount": 500, "id": 1},{"name": "Utilities", "amount": 500, "id": 2},];module.exports = envelopes;';
	fs.writeFile(path.join(__dirname, "..", "db", "db.js"), dbData, (err) => {
		console.log(err);
	});
	const countData = 'const count = 3;module.exports = count;';
	fs.writeFile(path.join(__dirname, "..", "db", "count.js"), countData, (err) => {
		console.log(err);
	});
	res.render(path.join(__dirname, "..", "views", "pages", "reset.ejs"), {
	  name: "reset"
	});
});

module.exports = resetRouter;