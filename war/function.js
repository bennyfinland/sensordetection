
 function $(id){
	return document.getElementById(id);
 }
//global variables			
	var i=0; 
	var res="";
	var geocoder;
	var theUser;
    var map = {};
	var latitude="";
	var longitude="";

//online or offline status checking...
	function updateOnlineStatus(msg) {
		var status = document.getElementById("status");
		var condition = navigator.onLine ? "ONLINE" : "OFFLINE";
		var time = new Date();
		
		status.setAttribute("class", condition);
		var state = document.getElementById("state");
		state.innerHTML = condition;
		var log = document.getElementById("log");
		position = res;
		//everytime online or offline	  
		log.appendChild(document.createTextNode("Event: " + msg + "; status=" + condition
			                                          +"\n"+"Position:" + position
			                                          +  " " + latitude
			                                          +  " " + longitude
			                                          +"\n"+"Time:" + time 
			                                          +"\n"+"\n"));
	 }
			  
			  
//show address, latitude, longitude
function showLocation(pos){

		latitude = pos.coords.latitude;
		longitude = pos.coords.longitude;
				
		var latLng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
				
	    if (geocoder) {
			 geocoder.geocode({'latLng': latLng}, 
			
			    function(results, status) {
			         if (status == google.maps.GeocoderStatus.OK) {
			            if (results[1]) {
				            $("location").innerHTML = results[1].formatted_address;
							res =  results[1].formatted_address;	
			            } 
			          } 
			        });
			      }		
			}
			
//load online offline and geolocation
	function loaded() {
		
		//online offline declaration
		updateOnlineStatus("loading...");
			
	    document.body.addEventListener("online", function () { updateOnlineStatus("online") }, false);
		document.body.addEventListener("offline", function () { updateOnlineStatus("offline") }, false);
		   
			
		 
		 geocoder = new google.maps.Geocoder();
		 
		 //google map and marker
	     if (navigator.geolocation){
			 var gps = navigator.geolocation;
			  gps.watchPosition(function(pos){
					 var latLng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
					 var opts = {zoom:19, center:latLng, mapTypeId:google.maps.MapTypeId.ROADMAP};
					 map = new google.maps.Map($("map_canvas"),opts);
					
					 theUser = new google.maps.Marker({
						    position: latLng,
						    map:map,
						    title:"You!"			
					 });
					
					 var infowindow = new google.maps.InfoWindow({
						  content:"You are here <br/> Latitude:"+
						             pos.coords.latitude +
						             "<br />longitude:" + pos.coords.longitude
					 });
						
						infowindow.open(map,theUser);
						showLocation(pos);
					});
					
				}	
			}
			
			
//device light sensor working here
    App = (function(){
		 var val = document.getElementById('val'), 
	     dark = true, 
	     body = document.body;
			  
		 val.innerHTML = 'lighting lux';
			  
	     window.addEventListener('devicelight', function(e){
			 var currentLux = e.value;
			 val.innerHTML = currentLux;
			  
			    if (currentLux > 10) {
			      if(dark){
			        dark = false;
			        body.className = 'lite';
			      }
			    }else{
			      if(!dark){
			        body.className = 'dark';
			        dark = true;
			      }
			    }
			  });
			
			});
		
window.addEventListener('load', App, false);
			