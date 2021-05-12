/**
	* postData()
	*
	* async function that posts form data to the server database.
	* 
	* Gets the data from #name and #amount from the form, then sets puts that in an object.
	* A post fetch() request is then made to /evelopes. 
	*/
const postData = async () => {
	const name = document.getElementById("name");
	const amount = document.getElementById("amount");
	const data = {name: name, amount: amount};
	try {
		const response = await fetch("http://localhost:3000/envelopes", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		});
		if(response.ok) {
			const jsonResponse = await response.json();
		}
	} catch(e) {
		//get request to err page
		console.log(e);
	}
}

/**
* getData()
* 
* Gets data from the server database.
*	
* Fetches /envelopes/list which returns the HTML for the list items
* in a JSON object under the key "data". Then, it assigns the returned data to 
* #envelopes-list. Finally, it runs removeMarkers().
*/
const getData = async () => {
	try {
		const response = await fetch("http://localhost:3000/envelopes/list");
		if(response.ok) {
			const jsonResponse = await response.json();
			console.log(jsonResponse);
			return jsonResponse;
		}
	} catch(e) {
		console.log(e);
	}
}

/**
* removeMarkers()
* 
* Removes those weird :marker <li> things.
*
* Gets all the <li> elements in #envelopes-list, then iterates through the 
* HTMLCollection to see if it has a falsy innerHTML value. If it does, it removes it from the DOM.
*/
const removeMarkers = (item) => {
	const ulList = document.getElementById(item);
	const ulListChildren = ulList.children;
	for(let i = 0; i < ulListChildren.length; i++) {
		let item = ulListChildren.item(i);
		if(!item.innerHTML || item.innerHTML == "\n\t\t\t\t") {
			item.remove();
		}
	}
}
		
/**
* hasClass(element, search)
* 
* Checks if an element has a class.
*
* Gets the list of all the classes on element, then iterates through each one.
* If the search is found as one of the classes, it returns true, otherwise it returns false.
* 
* @param {Object}  element  An element from the DOM.
* @param {String}  search   A string representing the class one wishes to find.
* 
* @return {Boolean}  True or false depending on whether the search was found.
*/
		
const hasClass = (element, search) => {
	let list = element.classList;
	list.forEach(item => {
		if(item = search) {
			return true;
		}
  });
	return false;
}
		
/**
* checkContent()
* 
* Checks if content is in the text boxes.
* 
* Gets the value of the two inputs and checks if they're falsy. If they are, it adds the 
* .error class to the blank input. If it's truthy, it checks if it has the .error class. If the inputs do,
* it removes it.
*/
const checkContent = () => {
	console.log("hi");
	const bill = document.getElementById("name");
	const amount = document.getElementById("amount");
	//If either input value is falsy
	if(!bill.value || !amount.value) {
		//Adds .error if they don't have it
		if(!hasClass(bill, "error")) {
			bill.classList.add("error");
			return;
		}
		if(!hasClass(amount, "error")) {
			amount.classList.add("error");
			return;
		}
	} else {
		if(hasClass(bill, "error")) {
			bill.classList.remove("error");
		}
		if(hasClass(amount, "error")) {
			amount.classList.remove("error");
		}
		postData();
	}
}