$(function(){
	$.get('/cities', appendToList);

	function appendToList(someCities) {
		var html = "";
		// have to use Object.keys so forEach can have an array, bc objecs NG
		Object.keys(someCities).forEach(function(city){
			html += "<li>" + city + "</li>";
			html += '<a href="#" data-city="'+city+'">REMOVE</a>';
		})
		$('.cities').html(html);
	}

	$.get('/cities', appendToList);
	// this is a listener to the submit event on the form element.
	$('form').on('submit', function(event) {
		// preventDefault avoids automatic form submission.
		event.preventDefault();
		var form = $(this);
		// serialize transforms form data to URL-encoded notation.
		var cityData = form.serialize();
		$.ajax({
			type: 'POST', url: '/cities', data: cityData
		}).success(function(cities){
			// appendToList function expects an array of cities
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
	$(function(){
		$('.city-list').on('click', 'a[data-city]', function(event){
			if (!confirm('Are you sure ?')) {
				return false;
			}
			// the link element that was clicked
			var target = $(event.currentTarget);

			$.ajax({
				type: 'DELETE', url: '/cities/' + target.data('city')
			}).done(function() {
				// removes li element containing the link
				target.parents('li').remove();
			});
		});
	});
});
