var ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
var ventana_ancho = $(window).width();
var input_active = false;

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
var searchBox;

function initAutocomplete() {

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  searchBox = new google.maps.places.SearchBox(input);
    // [END region_getplaces]
    
    searchBox.addListener('places_changed', function() {
	 	input_active = true;
	 	console.log(input_active);
 	});
}



$(document).on("click","#test",function(){
	var directionsService = new google.maps.DirectionsService();
   var directionsDisplay = new google.maps.DirectionsRenderer();

   var myOptions = {
     zoom:7,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   }

   var map = new google.maps.Map(document.getElementById("map"), myOptions);
   directionsDisplay.setMap(map);
   
   console.log($("#pac-input").val());
   
   var request = {
       origin: $("#pac-input").val(), 
       destination: 'Foro Sol',
       travelMode: google.maps.DirectionsTravelMode.DRIVING
   };

   directionsService.route(request, function(response, status) {
	   console.log(response);
      if (status == google.maps.DirectionsStatus.OK) {

         // Display the distance:
         document.getElementById('distance').innerHTML += 
            response.routes[0].legs[0].distance.value + " meters";

         // Display the duration:
         document.getElementById('duration').innerHTML += 
            response.routes[0].legs[0].duration.value + " seconds";

         directionsDisplay.setDirections(response);
      }
   });

});

$(document).on("click","#streetview",function(){
	var astorPlace = {lat: 40.729884, lng: -73.990988};
	
		panorama = map.getStreetView();
	  panorama.setPosition(astorPlace);
	  panorama.setPov(/** @type {google.maps.StreetViewPov} */({
	    heading: 265,
	    pitch: 0
	  }));
});

$(".indepth_pages").css({
	width : ventana_ancho + "px",
	height : ventana_alto + "px"
});

$(window).on("resize", function(){
	ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
	ventana_ancho = $(window).width();
	
	$(".indepth_pages").css({
	width : ventana_ancho + "px",
	height : ventana_alto + "px"
});
});