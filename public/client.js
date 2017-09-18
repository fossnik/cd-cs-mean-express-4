$(function(){
	$.get( '/cities', appendToList);

	function appendToList(someCities) {
		var html = "";
		// have to use Object.keys so forEach can have an array, bc objecs NG
		Object.keys(someCities).forEach(function(city){
			html += "<option>" + city;
		})
		$('.cities').html(html);
	}
});

$(function(){
	$.get('/cities', appendToList);
	$('form').on('submit', function(event) {
		event.preventDefault();
		var form = $(this);
		// serialize transforms form data to URL-encoded notation.
		var cityData = form.serialize();
		$.ajax({
			type: 'POST', url: '/cities', data: blockData
		}).done(function(cityName){
			// appendToList function expects and array of cities
			// cityName is array with the new city as its single argument.
			appendToList([cityName]);
				var list = [];
				var content, city;
				// builds out html block for each city - serial
				for(var i in cities){
					city = cities[i];
					content = '<a href="/blocks/'+city+'">'+city+'</a>';
					list.push($('<li>', { html: content}));
				}
			// cleans up text input fields
			form.trigger('reset');
		});
	});
});
