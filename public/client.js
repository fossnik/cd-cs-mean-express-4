$(function(){
	$.get('/cities', appendToList);

	function appendToList(cities) {
		var html = "";
		// have to use Object.keys so forEach can have an array, bc objecs NG
		Object.keys(cities).forEach(function(city, index){
			html += "<tr>";
				html += "<td>"+city+",&nbsp;<em>"+Object.values(cities)[index]+"</em></td>";
				// set city name to data-city attribute, which will be used to compose AJAX request.
				html += "<td><a href='#' data-city='"+city+"' href='/cities/"+city+"'>REMOVE</a></td>";
			html += "</tr>";
		})
		$('.cities-list').html(html);
	}

	// this is a listener to the submit event on the form element.
	$('form').on('submit', function(event) {
		// preventDefault prevents the form from being immediately submitted.
		event.preventDefault();
		// $() wraps this into a jQuery object to make it easier to work with.
		var form = $(this);
		// structures form data for AJAX (URL-encoded notation)
		var citySubmitted = form.serialize();
		$.ajax({
			type: 'POST', url: '/cities', data: citySubmitted
		}).success(function(cities){
			// appendToList function expects an array of cities
			// citySubmitted is array with the new city as its single argument.
			appendToList(cities);
			// clears input fields after submit
			form.trigger('reset');
		});
	});
	// this is the implementation of the delete city functionality.
	// listens for a click event on any button with a data-city attribute.
	$('.cities-list').on('click', 'a[data-city]', function(event){
		if (!confirm('Are you sure ?')) {	return false;	}
		// the clicked on element that triggered the click event (target)
		// $(event) wraps target into a jQuery object to make it easier to work with.
		var target = $(event.currentTarget);

		$.ajax({
			type: 'DELETE', url: '/cities/' + target.data('city')
		}).done(function() {
			alert(target.data('city'))
			// removes <tr> table element containing the link
			target.parents('tr').remove();
		});
	});
});
