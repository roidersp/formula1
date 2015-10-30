var ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
var ventana_ancho = $(window).width();
var input_active = false;
var start_location;
var searchBox;
var segundos, bici_segundos, bici_segundos;
var myVideo = document.getElementById("video"); 
var vel_t= 220;
var metros;

var tiempo_tw;

var d = new Date();

src= $("#gif_v").attr("src")+"?v=" +  d.getTime();
$("#gif_v").attr("src",src);

$("#indepoth_gif_video").css("background-image","url("+src+")");

$(document).on("click", "#indepth_share_twiiter", function(){
	var text = encodeURIComponent("Recorrí "+Math.round10((metros/1000),-1)+" km en "+tiempo_tw+" para llegar al Autódromo Hermanos Rodríguez en un Fórmula 1 ¿Y tú?");
	
	var url = encodeURIComponent("http://juanfutbol.com/indepth/formula-1");
	window.open("https://twitter.com/share?via=juanfutbol&text="+text+"&url="+url,"","width=500, height=300");
	}
);

$(document).on("click", "#indepth_share_fb", function(){
	var text="Recorrí "+Math.round10((metros/1000),-1)+" km en "+tiempo_tw+" para llegar al Autódromo Hermanos Rodríguez en un Fórmula 1 ¡Atrévete a tomar el volante!";
	var url = encodeURIComponent("http://juanfutbol.com/indepth/formula-1?text="+text);
	window.open("https://www.facebook.com/sharer/sharer.php?u="+url,"","width=500, height=300");

});

$(document).on("click","#boton_empezar",function(){
	$("#indepth_pov").addClass("pov_active");	
	$("#map_container").fadeOut("slow");
	$("#cont_to_vel").fadeIn();
});

function initAutocomplete() {

  var input = document.getElementById('pac-input');
  searchBox = new google.maps.places.Autocomplete(input);
    
    searchBox.addListener('places_changed', function() {
	 	input_active = true;
 	});
 	
}

$(document).on("click","#indepth_ver",function(){

	place = searchBox.getPlace();
		
	if(place != undefined){
		lat = place.geometry.location.lat();
	 	lng = place.geometry.location.lng();
	 		 	
	 	 var sv = new google.maps.StreetViewService();
	 	
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
			  
			sv.getPanoramaByLocation({lat: lat, lng: lng}, 50, function(data, status) {
			    if (status == 'OK') {
			    }
			    else {
				     $("#indepth_noST").show();
				}
			});
		  
		 $(document).on("click","#boton_to_vel",function(){
		
		 	$("#cont_to_vel").hide();
		 	$("#indepth_semaforo").fadeIn("fast");
		 	
		 	setTimeout(
			  function() 
			  {
				$("#indepth_semaforo").fadeOut("fast");
		 	
			$("#cont_to_vel").hide();
			
			num_vel = 0;
			direcion = true;
			
			valocimetro_interval = setInterval(function(){ 
				
				if(direcion){
					num_vel++;
					
					if(num_vel>=65){
						direcion=false;
					}
				}else{
					num_vel--;
					
					if(num_vel<=0){
						direcion=true;
					}
				}
				
				$("#indepth_velocimetro").css("background-image",'url('+urlIndepth+'images/velocimetro/velocimentro2_000'+num_vel+'.png)')
								
			}, 40);
			
			$("#indepth_velocimetro").fadeIn();
			
			if($(window).width()>600){
				
				myVideo.volume = 0.5;
				myVideo.play();
				
				$("#indepth_video_a").fadeIn("fast");
				setTimeout(
			  function() 
			  {			   
			    $("#boton_de_nuevo").show();
			    $("#indepth_velocimetro").fadeOut();
			    clearInterval(valocimetro_interval);
			    $("#indepth_noST").hide();
			     $("#indepth_video_a").animate({
				    opacity:0
			    },500);
			  }, 4300);
			  
			  setTimeout(
			  function() 
			  {
				   $("#indepth_resultados").fadeIn();
				 $("#indepth_video_a").hide();
				 myVideo.pause();
			    
			  }, 5500);
			}else{
				$("#indepoth_gif_video").fadeIn("fast");
			setTimeout(
			  function() 
			  {
			    $("#indepth_noST").hide();
			    $("#boton_de_nuevo").show();
			    $("#indepth_velocimetro").fadeOut();
			    clearInterval(valocimetro_interval);
			    $("#indepoth_gif_video").fadeOut("fast");
			     
			  }, 4300);
			  
			  setTimeout(
			  function() 
			  {
				  $("#indepth_direction_cont").css("background-image","url("+urlIndepth+"images/IMG_MovilFinal.png)");
				 $("#indepth_resultados").fadeIn("slow");
			    $("#indepth_street_view").fadeOut("fast");
			    
			  },6000)
			}

			panorama.setPosition({lat: 19.40319, lng: -99.09094});
			panorama.setZoom(0);
			panorama.setPov({
	          heading: -70,
	          pitch: 0
	        });
	        
	        }, 2200);
		});
		
		$(document).on("click","#boton_de_nuevo",function(){
		javascript:location.reload();
		});
	
	
   $("#indepth_direccion").fadeIn();
	var directionsService = new google.maps.DirectionsService();
   var directionsDisplay = new google.maps.DirectionsRenderer();

   var myOptions = {
     zoom:8,
     mapTypeId: google.maps.MapTypeId.ROADMAP,
     disableDefaultUI: true,
     durationInTraffic: true,
 
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
	  		
	  		velocidad=(vel_t*1000)/3600;
	  		
	  		$(".indepth_map_inicio").html($("#pac-input").val());
	  		$("#indepth_kilometros").html(Math.round10(metros/1000, -2) + " km");
	  		$("#res_distancia div").html(Math.round10(metros/1000, -2) + " km");
	  		$("#res_tiempo div").html((Math.round10(metros/velocidad)) + " hrs");
	  		
	  		s3= metros/velocidad;
	  		
	  		if((s3/60)>60){
		  		tiempo_tw = Math.round10((s3/3600),-1);
		  		if(tiempo_tw>1){
			  		tiempo_tw = tiempo_tw.concat(" hrs");
		  		}else{
			  		tiempo_tw = tiempo_tw.concat(" hr");
		  		}
		  		
		  		$("#res_tiempo div").html(tiempo_tw );
		  		
	  		}else{
                if(segundos>60){
                    tiempo_tw = Math.round10((s3/60),-1)  + " mins";
                    $("#res_tiempo div").html(tiempo_tw);
                }else{
                    tiempo_tw =s3+ " hrs";
                    $("#res_tiempo div").html(s3 );
                }
	  		}
	  		
	  		
	  		if((segundos/60)>60){
		  		$("#res_tiempo_carro").html(Math.round10((segundos/3600),-1) + " hrs");
	  		}else{
	  		if(segundos>60){
		  		$("#res_tiempo_carro").html(Math.round10((segundos/60),-1) + " mins");
	  		}else{
		  		$("#res_tiempo_carro").html(segundos + " seg");
	  		}
	  		}
           start_location = response.routes[0].legs[0];
           
           var st_view = $("#indepth_street_view");

         directionsDisplay.setDirections(response);
      }else{
	      $("#res_tiempo_carro").hide();
      }
   });
   
   
   var request = {
       origin: $("#pac-input").val(), 
       destination: new google.maps.LatLng(19.40319,-99.09094),
       travelMode: google.maps.DirectionsTravelMode.TRANSIT,
   };

   directionsService.route(request, function(response, status) {
	   
     if (status == google.maps.DirectionsStatus.OK) {
	  		segundos = response.routes[0].legs[0].duration.value;
	  		
	  		if((segundos/60)>60){
		  		 var tiempo_walk = Math.round10((segundos/3660),-1);
                if(tiempo_walk > 1)
		  		    $("#res_tiempo_bus").html(tiempo_walk + " hrs");
                else
                    $("#res_tiempo_bus").html(tiempo_walk + " hr");
	  		}else{
	  		
	  		if(segundos>60){
		  		$("#res_tiempo_bus").html(Math.round10((segundos/60),-1) + " mins");
	  		}else{
		  		$("#res_tiempo_bus").html(segundos + " seg");
	  		}
	  		}
	  		
	  		
      }else{
	      $("#res_tiempo_bus").hide();
      }
   });
      
   var request = {
       origin: $("#pac-input").val(), 
       destination: new google.maps.LatLng(19.40319,-99.09094),
       travelMode: google.maps.DirectionsTravelMode.WALKING,
   };

   directionsService.route(request, function(response, status) {
	   
      if (status == google.maps.DirectionsStatus.OK) {
	  		segundos = response.routes[0].legs[0].duration.value;
	  		if((segundos/60)>60){
                var tiempo_walk = Math.round10((segundos/3060),-1);
                if(tiempo_walk > 1)
		  		    $("#res_tiempo_walk").html(tiempo_walk + " hrs");
                else
                    $("#res_tiempo_walk").html(tiempo_walk + " hr");
	  		}else{
	  		if(segundos>60){
		  		$("#res_tiempo_walk").html(Math.round10((segundos/60),-1) + " mins");
	  		}else{
		  		$("#res_tiempo_walk").html(segundos + " seg");
	  		}
	  		}
	  		
      }else{
	      $("#res_tiempo_walk").hide()
      }
   });
   
    var request = {
       origin: $("#pac-input").val(), 
       destination: new google.maps.LatLng(19.40319,-99.09094),
       travelMode: google.maps.DirectionsTravelMode.BICYCLING,
   };

   directionsService.route(request, function(response, status) {
	   
	   console.log(response);
	   
      if (status == google.maps.DirectionsStatus.OK) {
	  	segundos = response.routes[0].legs[0].duration.value;
	  	if((segundos/60)>60){
		  		 var tiempo_walk = Math.round10((segundos/3600),-1);
                if(tiempo_walk > 1)
		  		    $("#res_tiempo_bici").html(tiempo_walk + " hrs");
                else
                    $("#res_tiempo_bici").html(tiempo_walk + " hr");
	  		}else{
		  	if(segundos>60){
		  		$("#res_tiempo_bici").html(Math.round10((segundos/60),-1) + " mins");
	  		}else{
		  		$("#res_tiempo_bici").html(segundos + " seg");
	  		}
	  		}
      }else{
	    $("#res_tiempo_bici").hide();  
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
