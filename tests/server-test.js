const {assert} = require("assert");
const request = require("supertest");

const app = require("../server.js");
const envelopesRouter = require("../routes/envelopes.js");
const db = require("../db/db.js");

describe("envelopesRouter", () => {
	describe("get", () => {
		it("user is sent to envelopes.html", async () => {
			const request = await request(app).get("/envelopes");
			assert.equal(response.status, 200);
		});
	});
});