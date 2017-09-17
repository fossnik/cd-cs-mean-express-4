var express = require('express');
var app = express();

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
	if (request.query.limit > 0) {
		if (request.query.limit > Object.keys(someCities).length) {
			send.status(401);
			response.end();
		}
		response.json(Object.keys(someCities).slice(0, request.query.limit));
	} else {
		response.json(someCities);
	}
});

// "normalizing" request parameter (case insensitivity)
app.param('city', function(request, response, next){
	// convert 'providence' to 'Providence' - passthrough
	request.params.cityLower = request.params.city.slice(0,1).toUpperCase() + request.params.city.slice(1).toLowerCase();
	next();
});

// 2nd route - returns state from the relevant key-value pair (city-state)
app.get('/cities/:city', function(request, response){
	var state = someCities[request.params.cityLower];
	if (!state) {
		// state not found
		response.status(404).json('No description found for ' + request.params.cityLower);
	} else {
		response.json(state);
	}
});

// serving up fresh HTML on port 8000
app.listen(8000, function () {
	console.log("Serving up HTML on Port 8000");
});
