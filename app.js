var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended:false});

// use that public folder (static middleware)
app.use(express.static('public'));

// route for /cities - do AJAX for html injection
var someCities = {"Providence": "Rhode Island",
									"Austin": "Texas",
									"Melbourne": "Australia",
									"Detroit": "Michegan",
									"Marseille": "France",
									"Woonsocket": "Rhode Island",
									"Accra": "Ghana",
									"Coventry": "Rhode Island",
									"Cordoba": "Argentina",
									"Edinburgh": "Scotland"};

app.get('/cities', function(request, response){
	// query validation
	if (request.query.limit > 0) {
		if (request.query.limit > Object.keys(someCities).length) {
			// send a 401 status error because the query is NG
			send.status(401);
			response.end();
		}
		// keys returns properties from someCities object - slice to query size
		response.json(Object.keys(someCities).slice(0, request.query.limit));
	} else {
		// serializes someCities object
		response.json(someCities);
	}
});

// "normalizing" request parameter (case insensitivity)
app.param('city', function(request, response, next){
	// convert 'providence' to 'Providence' - passthrough
	request.params.cityCase = request.params.city.slice(0,1).toUpperCase() + request.params.city.slice(1).toLowerCase();
	next();
});

// 2nd route - returns state from the relevant key-value pair (city-state)
app.get('/cities/:city', function(request, response){
	var state = someCities[request.params.cityCase];
	if (!state) {
		// state not found
		response.status(404).json('No description found for ' + request.params.cityCase);
	} else {
		response.json(state);
	}
});

// Using multiple route handlers is useful for re-using middleware that load resources, perform validations, authentication, etc.
app.post('/cities', parseUrlencoded, function(request, response) {
	// reading request data - returns form data
	var newCity = request.body;
	// adds new city to cities object
	someCities[newCity.name] = newCity.description;
	// sets 201 Created status code and responds with new city name
	response.status(201).json(newCity.name);
});

// serving up fresh HTML on port 8000
app.listen(8000, function () {
	console.log("Serving up HTML on Port 8000");
});
