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
const updateRouter = require("./routes/update.js");
const deleteRouter = require("./routes/delete.js");
const resetRouter = require("./routes/reset.js");
const transferRouter = require("./routes/transfer.js");

//express.static
app.use(express.static("views/pages"));

//cors
app.use(cors());

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());

//Routers
app.use("/", homeRouter);
app.use("/envelopes", envelopesRouter);
app.use("/search", searchRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter);
app.use("/reset", resetRouter);
app.use("/transfer", transferRouter);

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