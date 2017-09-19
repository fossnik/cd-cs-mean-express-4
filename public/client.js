$(function(){
	$.get('/cities', appendToList);

	function appendToList(someCities) {
		var html = "";
		// have to use Object.keys so forEach can have an array, bc objecs NG
		Object.keys(someCities).forEach(function(city){
			html += "<li>" + city + "</li>";
		})
		$('.cities').html(html);
	}

	$.get('/cities', appendToList);
	$('form').on('submit', function(event) {
		event.preventDefault();
		var form = $(this);
		// serialize transforms form data to URL-encoded notation.
		var cityData = form.serialize();
		$.ajax({
			type: 'POST', url: '/cities', data: cityData
		}).success(function(cities){
			// appendToList function expects and array of cities
			// cityName is array with the new city as its single argument.
			appendToList(cities);
				var list = [];
				var content;
				// builds out html block for each city - serial
				Object.keys(cities).forEach(function(city){
					content = '<a href="/cities/'+city+'">'+city+'</a>';
					list.push($('<li>', { html: content}));
				})
			// cleans up text input fields
			form.trigger('reset');
		});
	});
});
