$(function(){
	$.get( '/cities', function(someCities) {
		var html = "";
		someCities.forEach(function(city){
			html += "<option>" + city;
		})
		$('.cities').html(html);
	});
});
