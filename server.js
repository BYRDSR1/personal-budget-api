const express = require("express");
const cors = require("cors");

//App and Port Variables
const app = express();
const PORT = process.env.port || 3000;

//Routers
const envelopesRouter = require("./routes/envelopes.js");
const homeRouter = require("./routes/home.js");

//cors
app.use(cors());

//Routers
app.use("/envelopes", envelopesRouter);
app.use("/", homeRouter);

app.listen(PORT, () => {
	console.log(`SERVER LISTENING ON PORT ${PORT}`);
});