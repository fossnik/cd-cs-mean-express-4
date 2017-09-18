$(function(){
	$.get( '/cities', function(someCities) {
		var html = "";
		someCities.forEach(function(city){
			html += "<option>" + city;
		})
		$('.cities').html(html);
	});
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
		}).done(function(cityName))
	});
});
