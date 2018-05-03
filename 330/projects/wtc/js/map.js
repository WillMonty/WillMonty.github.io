"use strict";
//For google maps or location code

let map;
let infowindow;
let userMarker; //The marker representing the user's location
let markers=[]; //Array of all current event markers

const LOCATION_KEY = 'userLocation';
let userLocation = {latitude: 43.083848, longitude: -77.6799}; //Initialize at RIT before checking webstorage

function initMap() {

	if(localStorage.getItem(LOCATION_KEY)){
		userLocation = JSON.parse(localStorage.getItem(LOCATION_KEY));
	}
	else{
		getLocation(); //Get user's location if none in storage
	}

	let mapOptions = {
		center: {lat:userLocation.latitude, lng:userLocation.longitude},
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	//Set up user location marker
	userMarker = new google.maps.Marker({
		position: {lat: userLocation.latitude, lng: userLocation.longitude},
		clickable: false,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 6,
			strokeColor: '#FF0034'
		},
		shadow: null,
		zIndex: 999,
		map: map
	});
}

function addMarker(event) {

	let nextMark = new Marker(event);

	let matchingMarkerIndex = existingVenue(nextMark.venue);

	//There is no matching venue
	if(matchingMarkerIndex == -1)
	{
		nextMark.addToMap();
		markers.push(nextMark);
		
		//Give it a unique info window on click
		google.maps.event.addListener(nextMark.googleMarker, 'click', function(e){
			makeInfoWindow(nextMark);
		});
	}
	else //This venue already exists in a marker
	{
		markers[matchingMarkerIndex].addContent(nextMark.contentString);
	}
	
	app.eventsShown++;
}

//Checks if the venue passed in already exists in the markers currently being used and returns its index in the list. Returns -1 if no match
function existingVenue(otherVenue)
{
	for(let i = 0; i < markers.length; i++)
	{
		if(markers[i].venue == otherVenue) return i;
	}

	return -1;
}

function clearMarkers()
{
	if(infowindow) 
		infowindow.close();

	for (let i = 0; i < markers.length; i++) {
		markers[i].googleMarker.setMap(null);
	}
	markers =[];
}

function makeInfoWindow(marker){
	if(infowindow) infowindow.close();

	//Venue separate from content string to make it only display on unique markers
	infowindow = new google.maps.InfoWindow({
		map: map,
		position: marker.position,
		content: '<h3 class="venueTitle">' + marker.venue + '</h3>' + '<hr>' + marker.contentString
	});
}

function getLocation()
{	
	//Check if location supported by the system
	if(navigator.geolocation)
	{
		app.dismissCountdown = 200; //In case the location search takes forever
		app.locationText = "Getting Location...";

		//Try to get the location
		navigator.geolocation.getCurrentPosition(function(position){
			userLocation.latitude = position.coords.latitude;
			userLocation.longitude = position.coords.longitude;

			//Update map and location marker
			map.setCenter({lat: userLocation.latitude, lng:userLocation.longitude});
			userMarker.setPosition({lat: userLocation.latitude, lng:userLocation.longitude});

			//Update text
			app.locationText = "Location found";
			app.locationVarient = "success";
			app.locDismissCountdown = app.locDismissTime;

			//Store location in local storage
			localStorage.setItem(LOCATION_KEY, JSON.stringify(userLocation));
			
			//Get the metro ID from this location, but don't search afterwards
			getMetroID(false);
		}, handleLocationError);

	}
	else //Location not allowed by device
	{
		app.locationText = "Request unsupported";
		app.locDismissCountdown = app.locDismissTime;
	}
}

//Handles errors thrown by the location attempt
function handleLocationError(error)
{
	app.locationVariant = "danger";
	switch(error.code) {
		case error.PERMISSION_DENIED:
			app.locationText = "Location denied"
			break;
		case error.POSITION_UNAVAILABLE:
			app.locationText = "Location unavailable"
			break;
		case error.TIMEOUT:
			app.locationText = "Request timed out"
			break;
		case error.UNKNOWN_ERROR:
			app.locationText = "Unknown error"
			break;
					 }
	app.locDismissCountdown = app.locDismissTime;
}