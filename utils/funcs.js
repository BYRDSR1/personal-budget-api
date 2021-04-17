const envelopes = require("../db/db.js");

const convertEnvelopesToHTML = (array) => {
	let envString = "";
	array.forEach(element => {
		let str = "<p>" + element.name + " - " + element.amount + "<\p>";
		envString += str;
	});
	return envString;
} 

const addToEnvelopes = (name, amount) => {
	let envelope = {name: name, amount: amount};
	envelopes.push(envelopes);
}

module.exports = {
	convertEnvelopesToHTML,
  addToEnvelopes
};