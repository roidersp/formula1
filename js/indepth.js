var ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
var ventana_ancho = $(window).width();
var input_active = false;
var start_location;

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
var searchBox;

$(document).on("click","#boton_empezar",function(){
	$("#indepth_pov").addClass("pov_active");	
	$("#indepth_velocimetro").fadeIn();
	
	$("#map_container").fadeOut("slow");
	$("#boton_to_vel").fadeIn();
});



function initAutocomplete() {

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  searchBox = new google.maps.places.Autocomplete(input);
    // [END region_getplaces]
    
    searchBox.addListener('places_changed', function() {
	 	input_active = true;
 	});
 	
 	$(window).on("click","#pac-input",function(){
	 	
 	});
}

$(document).on("click","#indepth_ver",function(){
	
	
	
	place = searchBox.getPlace();
		 	
 	//location = place.geometry.location
 	
 	 lat = place.geometry.location.lat();
 	 lng = place.geometry.location.lng();
 	
 	//var heading = google.maps.geometry.spherical.computeHeading(data.location.latLng, marker_pano.getPosition());
 	
 	//console.log("heading: "+heading);
 	

 	
 	 var panorama = new google.maps.StreetViewPanorama(
	      document.getElementById('indepth_street_view'), {
	        position: {lat: lat, lng: lng},
	        addressControlOptions: {
	          position: google.maps.ControlPosition.BOTTOM_CENTER
	        },
	        linksControl: false,
	        panControl: false,
	        enableCloseButton: false,
	        pov: {
	          heading: -80,
	          pitch: 0
	        },
	        zoom:0,
			linksControl: false,
	        panControl: false,
	        enableCloseButton: false,
	        disableDefaultUI: true
	  });
	  
	  
	 $(document).on("click","#boton_to_vel",function(){
		
		window.setTimeout(panorama.setZoom(1),1);
		window.setTimeout(panorama.setZoom(2),1000);
		window.setTimeout(panorama.setZoom(3),1500);
		window.setTimeout(panorama.setZoom(7),1800);
		//window.setTimeout(panorama.setZoom(5),1500);
		
		panorama.setPosition({lat: 19.40319, lng: -99.09094});
		panorama.setZoom(0);
		panorama.setPov({
	          heading: -70,
	          pitch: 0
	        });
			
	

	});	  
	
	
	
	
   $("#indepth_direccion").fadeIn();
	var directionsService = new google.maps.DirectionsService();
   var directionsDisplay = new google.maps.DirectionsRenderer();

   var myOptions = {
     zoom:8,
     mapTypeId: google.maps.MapTypeId.ROADMAP,
     disableDefaultUI: true
   }

   var map = new google.maps.Map(document.getElementById("map"), myOptions);
   directionsDisplay.setMap(map);
   
  
   
   var request = {
       origin: $("#pac-input").val(), 
       destination: new google.maps.LatLng(19.40319,-99.09094),
       travelMode: google.maps.DirectionsTravelMode.DRIVING,
       
   };

   directionsService.route(request, function(response, status) {
	   
	   
      if (status == google.maps.DirectionsStatus.OK) {
	  		metros = response.routes[0].legs[0].distance.value;
	  		$("#indepth_map_inicio").html($("#pac-input").val());
	  		$("#indepth_kilometros").html(metros/1000 + "km");
         // Display the distance:
         //document.getElementById('distance').innerHTML += 
          //  response.routes[0].legs[0].distance.value + " meters";

         // Display the duration:
         //document.getElementById('duration').innerHTML += 
           // response.routes[0].legs[0].duration.value + " seconds";
           start_location = response.routes[0].legs[0];
           
    
           
           var st_view = $("#indepth_street_view");

         directionsDisplay.setDirections(response);
      }
   });
   

});

$(document).on("click","#streetview",function(){
	var astorPlace = {lat: 19.40319, lng: -99.09094};
	
	panorama = map.getStreetView();
	  panorama.setPosition(astorPlace);
	  panorama.setPov(/** @type {google.maps.StreetViewPov} */({
	    heading: 265,
	    pitch: 0
	  }));
});

$(".indepth_pages").css({
	width : ventana_ancho + "px",
	height : ventana_alto-60 + "px"
});

$(window).on("resize", function(){
	ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
	ventana_ancho = $(window).width();
	
	$(".indepth_pages").css({
	width : ventana_ancho + "px",
	height : ventana_alto-60 + "px"
});
});