var ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
var ventana_ancho = $(window).width();
var input_active = false;
var start_location;
var searchBox;
var segundos;


$(document).on("click", "#indepth_share_twiiter", function(){
	var text = encodeURIComponent();
	
	var url = encodeURIComponent("http://juanfutbol.com/indepth/");
	window.open("https://twitter.com/share?text="+text+"&url="+url,"","width=500, height=300");
	}
);

$(document).on("click", "#indepth_share_fb", function(){
	var text="";
	var url = encodeURIComponent("http://juanfutbol.com/indepth/text="+text);
	window.open("https://www.facebook.com/sharer/sharer.php?u="+url,"","width=500, height=300");

});

$(document).on("click","#boton_empezar",function(){
	$("#indepth_pov").addClass("pov_active");	
	$("#indepth_velocimetro").fadeIn();
	$("#map_container").fadeOut("slow");
	$("#cont_to_vel").fadeIn();
});

function initAutocomplete() {

  var input = document.getElementById('pac-input');
  searchBox = new google.maps.places.Autocomplete(input);
    
    searchBox.addListener('places_changed', function() {
	 	input_active = true;
	 	console.log("test");
 	});
 	
}

$(document).on("click","#indepth_ver",function(){

	place = searchBox.getPlace();
		
	if(place != undefined){
		lat = place.geometry.location.lat();
	 	 lng = place.geometry.location.lng();
	 	
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
		
			$("#cont_to_vel").hide();
			
			$("#indepth_video_a").fadeIn("fast");
			
			setTimeout(
			  function() 
			  {
			    $("#indepth_video_a").fadeOut("500");
			    $("#indepth_resultados").show();
			    $("#boton_de_nuevo").show();
			  }, 3500);
			
			
				panorama.setPosition({lat: 19.40319, lng: -99.09094});
				panorama.setZoom(0);
				panorama.setPov({
			          heading: -70,
			          pitch: 0
			        });
		
	
		});
		
		
		$(document).on("click","#boton_de_nuevo",function(){
		avascript:location.reload();
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
	   
	   console.log(response.routes[0].legs[0]);
      if (status == google.maps.DirectionsStatus.OK) {
	  		metros = response.routes[0].legs[0].distance.value; 
	  		segundos = response.routes[0].legs[0].duration.value;
	  		
	  		
	  		
	  		$(".indepth_map_inicio").html($("#pac-input").val());
	  		$("#indepth_kilometros").html(Math.round10(metros/1000, -2) + " km");
	  		$("#res_distancia span").html(Math.round10(metros/1000, -2) + " km");
	  		$("#res_tiempo_normal span").html(Math.round10(segundos,0) + " seg");
	  		$("#res_tiempo span").html(Math.round10(metros/83.3333,0) + " seg");
           start_location = response.routes[0].legs[0];
           
           
           var st_view = $("#indepth_street_view");

         directionsDisplay.setDirections(response);
      }
   });
		
		
	}


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




function bgadj(){
         
        var videoActualWidth = video.getBoundingClientRect().width;
        var videoActualHeight = video.getBoundingClientRect().height;
              
        var ratio =  videoActualWidth / videoActualHeight;         
         
        if ((window.innerWidth / window.innerHeight) < ratio){
          
            video.setAttribute("style", "width: auto");
            video.setAttribute("style", "height: 100%");
              
            <!-- si el vídeo es mas ancho que la ventana lo centro. Esta parte es opcional -->
            if (videoActualWidth > window.innerWidth){
              
                var ajuste = (window.innerWidth - videoActualWidth)/2;                
                
                video.setAttribute("style", "left:"+ajuste+"px");          
            }
          
        }
        else{ 
          
            video.setAttribute("style", "width: 100%");
            video.setAttribute("style", "height: auto");
            video.setAttribute("style", "left: 0");
  
        }
          
    }
 
    <!-- vuelvo a llamar a la función  bgadj() al redimensionar la ventana -->
    window.onresize = function() {
        bgadj();
  
    }
    
    bgadj();
    
    // Closure
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();
