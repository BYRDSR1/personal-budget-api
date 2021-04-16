const express = require("express");
const cors = require("cors");

//App and Port Variables
const app = express();
const PORT = process.env.port || 3000;

//Routers
const envelopesRouter = require("./routes/envelopes.js");

//cors
app.use(cors());

//Main page
app.get("/", (req, res) => {
	res.send("Hello, World!");
});

//Routers
app.use("/envelopes", envelopesRouter);

app.listen(PORT, () => {
	console.log(`SERVER LISTENING ON PORT ${PORT}`);
});