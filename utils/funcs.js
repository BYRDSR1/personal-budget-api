const envelopes = require("../db/db.js");
const fs = require("fs");
const path = require("path");
const count = require("../db/db.js")

/**
* convertEnvelopesToHTML()
* 
* Iterates through a given array, adding the info from the array info a temporary HTML string. This string is then added to envString, which is returned after the forEach().
*
* @param {Array}  array  The array to be converted into an HTML list
* @return {String}       An HTML string that contains array's data
*/

const convertEnvelopesToHTML = (array) => {
	let envString = "";
	array.forEach(element => {
		let str = '<li class="list-group-item">' + element.id + " - " + element.name + " - " + "$" + element.amount + '<\li>';
		envString += str;
	});
	return envString;
} 

/**
* convertArrayToString()
* 
* Returns an array that's been turned into a string.
*
* @param  {Array}  array  An array 
* @return {String}        An array that's now a string
*/

const convertArrayToString = (array) => {
	return JSON.stringify(array);
}

/**
* addToEnvelope()
* 
* Exits if the name is unspecified. Creates an object with name, amount, and id, then pushes it to envelopes. Then, the data is written to db.js using fs.
*
* @param  {String}           name    The name of the new envelope
* @param  {(String|Number)}  amount  The amount of the new envelope
* @param  {Number}					 id      The id of the new envelope
* @return {Array}                    Envelopes  
*/

const addToEnvelopes = (name, amount, id) => {
	if(name == null) {
		return;
	}
	let envelope = {"name": name, "amount": parseInt(amount), "id": id};
	envelopes.push(envelope);
	const data = "const envelopes = " + convertArrayToString(envelopes) + ";module.exports = envelopes;";
	fs.writeFile(path.join(__dirname, "..", "db", "db.js"), data, (err) => {
		res.status(500).send("ERROR 500 INTERNAL SERVER ERROR");
	});
	return envelope;
}

/**
* findEnvelope()
* 
* Determines whether find is the name or id of an envelope, then iterates through envelopes. If an envelopes type property is matched with find, the envelope is added to an array called matched. If no envelopes are found, it returns null. If the format isn't specified, it returns an HTML string of matched's contents. If it's specified as an object, it returns matched unformated.
*
* @param  {(Number|String)}  find    Either the id or name of the old envelope
* @param  {String}           format  Specifies the format of the returned object
* @return {(Null|Array|String)}      Either Null, an Array with objects, or an HTML String
*/

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
* @param {(Number|String)}  find  Either the id or name of the old envelope
* @param {Object}         info  An object that represents the new envelope
*/

const updateEnvelope = (find, info) => {
	const envelope = findEnvelope(find, "object")[0];
	if(!info.name) {
		info.name = envelope.name;
	}
	if(!info.amount) {
		info.amount = envelope.amount;
	}
	envelope.name = info.name;
	envelope.amount = parseInt(info.amount);
	const data = "const envelopes = " + convertArrayToString(envelopes) + ";module.exports = envelopes;";
	fs.writeFile(path.join(__dirname, "..", "db", "db.js"), data, (err) => {
		res.status(500).send("ERROR 500 INTERNAL SERVER ERROR");
	});
}

const deleteEnvelope = (find) => {
	const envelope = findEnvelope(find, "object")[0];
	envelopes.splice(envelopes.indexOf(envelope), 1);
	const data = "const envelopes = " + convertArrayToString(envelopes) + ";module.exports = envelopes;";
	fs.writeFile(path.join(__dirname, "..", "db", "db.js"), data, (err) => {
		res.status(500).send("ERROR 500 INTERNAL SERVER ERROR");
	});
}
/**
* resetEnvelopeIds()
*
* iterates through envelopes and assigns a new id based on location in the array. The total items in the array is counted, one is added to it, then it's written to count.js.
* After that, the new envelopes array is written to db.js.
* 
*/

const resetEnvelopeIds = () => {
	for(let i = 1; i <= envelopes.length; i++) {
		envelopes[(i-1)].id = i;
	}
	console.log(envelopes);
	const countData = "const count = " + (envelopes.length + 1) + ";module.exports = count;";
	fs.writeFile(path.join(__dirname, "..", "db", "count.js"), countData, (err) =>{
		res.status(500).send("ERROR 500 INTERNAL SERVER ERROR");
	});
	const envelopeData = "const envelopes = " + convertArrayToString(envelopes) + ";module.exports = envelopes;";
	fs.writeFile(path.join(__dirname, "..", "db", "db.js"), data, (err) => {
		res.status(500).send("ERROR 500 INTERNAL SERVER ERROR");
	});
}

module.exports = {
	convertEnvelopesToHTML,
  addToEnvelopes,
	findEnvelope,
	updateEnvelope,
	deleteEnvelope,
	resetEnvelopeIds
};