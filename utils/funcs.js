const envelopes = require("../db/db.js");
const fs = require("fs");
const path = require("path");
const backup = `const envelopes = [
  {"name": "bills", "amount": 500},
	{"name": "bills", "amount": 500},
];


module.exports = envelopes;`
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

const addToEnvelopes = (name, amount) => {
	if(name == null) {
		return;
	}
	console.log("addToEnvelopes(): ", name, amount, "\n");
	let envelope = {"name": name, "amount": amount};
	envelopes.push(envelope);
	const data = "const envelopes = " + convertArrayToString(envelopes) + ";module.exports = envelopes;";
	fs.writeFile(path.join(__dirname, "..", "db", "db.js"), data, (err) => {
		console.log(err)
		/*fs.writeFile(path.join(__dirname, "..", "db", "db.js"), backup, (error) => {
			console.log(error);
		});*/
	});
	console.log(envelopes);
	return envelope;
}

module.exports = {
	convertEnvelopesToHTML,
  addToEnvelopes
};