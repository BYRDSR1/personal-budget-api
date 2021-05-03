const envelopes = require("../db/db.js");
const fs = require("fs");
const path = require("path");
const count = require("../db/db.js")

console.log(count);

const convertEnvelopesToHTML = (array) => {
	let envString = "";
	array.forEach(element => {
		let str = '<li class="list-group-item">' + element.name + " - " + element.amount + '<\li>';
		envString += str;
	});
	return envString;
} 

//Maybe JSON.stringify()????
/*Try this link for help: https://stackoverflow.com/questions/8892465/what-does-object-object-mean-javascript*/
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
	console.log(envelopes);
	return envelope;
}

module.exports = {
	convertEnvelopesToHTML,
  addToEnvelopes
};