const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

//App and Port Variables
const app = express();
const PORT = process.env.port || 3000;

//Routers
const envelopesRouter = require("./routes/envelopes.js");
const homeRouter = require("./routes/home.js");
const searchRouter = require("./routes/search.js");

//express.static
app.use(express.static("views/pages"));

//cors
app.use(cors());

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());

//Routers
app.use("/envelopes", envelopesRouter);
app.use("/", homeRouter);
app.use("/search", searchRouter);

//Nonexistent page

app.get("/:path", (req, res, next) => {
	const file = req.params.path;
	fs.readFile(file, (err, data) => {
		if(err) {
			res.status(404).send("ERROR 404 PAGE NOT FOUND")
		} else {
			next();
		}
	})
});

app.listen(PORT, () => {
	console.log(`SERVER LISTENING ON PORT ${PORT}`);
});