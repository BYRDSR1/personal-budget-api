const convertEnvelopesToString = (array) => {
	let envString = "";
	array.forEach(element => {
		let str = `${element.name} - ${element.amount}\n`;
		envString += str;
	});
	return envString;
} 

module.exports = convertEnvelopesToString;