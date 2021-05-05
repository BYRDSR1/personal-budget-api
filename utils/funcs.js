const envelopes = require("../db/db.js");
const fs = require("fs");
const path = require("path");
const count = require("../db/db.js")

const convertEnvelopesToHTML = (array) => {
	let envString = "";
	array.forEach(element => {
		let str = '<li class="list-group-item">' + element.name + " - " + element.amount + '<\li>';
		envString += str;
	});
	return envString;
} 

const convertArrayToString = (array) => {
	return JSON.stringify(array);
}

const addToEnvelopes = (name, amount, id) => {
	if(name == null) {
		return;
	}
	let envelope = {"name": name, "amount": amount, "id": id};
	envelopes.push(envelope);
	const data = "const envelopes = " + convertArrayToString(envelopes) + ";module.exports = envelopes;";
	fs.writeFile(path.join(__dirname, "..", "db", "db.js"), data, (err) => {
		console.log(err)
	});
	return envelope;
}

module.exports = {
	convertEnvelopesToHTML,
  addToEnvelopes
};