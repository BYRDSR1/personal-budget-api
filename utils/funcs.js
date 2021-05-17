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
	let envelope = {"name": name, "amount": parseInt(amount), "id": id};
	envelopes.push(envelope);
	const data = "const envelopes = " + convertArrayToString(envelopes) + ";module.exports = envelopes;";
	fs.writeFile(path.join(__dirname, "..", "db", "db.js"), data, (err) => {
		console.log(err)
	});
	return envelope;
}

const findEnvelope = (find, format="html") => {
	const type = typeof find == "string" ? "name" : "id";
	let matched = [];
	envelopes.forEach(envelope => {
		if(envelope[type] == find) {
			matched.push(envelope);
		}
	});
	if(!matched[0]) {
		return null;
	}
	if(format == "html") {
	  return convertEnvelopesToHTML(matched);
	} else if(format == "object") {
		return matched;
	}
}
/**
* updateEnvelope()
* 
* finds the old envelope from envelopes then updates it. It then uses fs to write envelopes back to db.js similar to how addEnvelope() does it.
*
* @param {Number|String}  find  Either the id or name of the old envelope
* @param {Object}         info  An object that represents the new envelope
*/
const updateEnvelope = (find, info) => {
	const envelope = findEnvelope(find, "object")[0];
	console.log(envelope);
	if(!info.name) {
		info.name = envelope.name;
	}
	if(!info.amount) {
		info.amount = envelope.amount;
	}
	envelope.name = info.name;
	envelope.amount = parseInt(info.amount);
	console.log(envelope);
	const data = "const envelopes = " + convertArrayToString(envelopes) + ";module.exports = envelopes;";
	fs.writeFile(path.join(__dirname, "..", "db", "db.js"), data, (err) => {
		console.log(err)
	});
}

module.exports = {
	convertEnvelopesToHTML,
  addToEnvelopes,
	findEnvelope,
	updateEnvelope
};