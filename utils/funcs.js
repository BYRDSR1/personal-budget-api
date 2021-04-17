const envelopes = require("../db/db.js");

const convertEnvelopesToHTML = (array) => {
	let envString = "";
	array.forEach(element => {
		let str = "<p>" + element.name + " - " + element.amount + "<\p>";
		envString += str;
	});
	return envString;
} 

module.exports = convertEnvelopesToHTML;