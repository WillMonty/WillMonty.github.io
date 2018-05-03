//Get the artist's ID that the user is looking for and then searches for those events
function searchArtist()
{
	app.searching = true;
	app.currentArtistID == -1; //Reset ID

	let searchQuery = 'https://api.songkick.com/api/3.0/search/artists.json?apikey=' + SONGKICK_KEY + '&query=' + app.filters.artist;

	fetch(searchQuery)
		.then(response => {
		if (!response.ok) {
			app.searchAlertText = "Search Artist Error: ";
			if(!app.displayingSearchError)
				displaySearchError(response.statusText);
			throw Error(`ERROR: ${response.statusText}`);
		}
		return response.json();
	})
		.then(json => {

		//If there's no result don't bother setting the ID
		if(json.resultsPage.results.artist)
		{
			//Set artist ID and continue to main search
			app.currentArtistID = json.resultsPage.results.artist[0].id;
			app.lastArtistSearch = app.filters.artist;
			searchFilters();
		}
		else
		{
			app.searchAlertText = "";
			displaySearchError("No matching artist found.");
		}
	})
}

const METRO_KEY = 'metroID';

//Check if the metroID has already been found or set
function hasMetroID() {
	//Set the metro id if it hasn't been already
	if (app.metroID == -1) 
	{
		if(localStorage.getItem(METRO_KEY))
		{
			app.metroID = localStorage.getItem(METRO_KEY);
			return true;
		}
		else
		{
			return false; //Don't search until it is found
		}
	}
	else
	{
		return true;
	}
}

//Gets the user's metro ID from songkick based on their current location. Search after dictates if the function will bounce back to a search function once the ID is found
function getMetroID(searchAfter) {
	let metroQuery = 'https://api.songkick.com/api/3.0/search/locations.json?location=geo:' + userLocation.latitude + ',' + userLocation.longitude + '&apikey=' + SONGKICK_KEY;

	fetch(metroQuery)
		.then(response => {
		if (!response.ok) {


			app.searchAlertText = "Metro ID Search Error: ";
			if(!app.displayingSearchError)
				displaySearchError(response.statusText);
			throw Error(`ERROR: ${response.statusText}`);
		}
		return response.json();
	})
		.then(json => {

		app.metroID = json.resultsPage.results.location[0].metroArea.id;

		//Store the metroID in local storage
		localStorage.setItem(METRO_KEY, JSON.stringify(app.metroID));

		//Bounce back to the search now that the metro id has been found if desired
		if(searchAfter)
		{
			if(app.filtersOn)
			{
				searchFilters();
			}
			else
			{
				searchAll();
			}
		}
	})
}

//Gets the distance between two world coordinates in miles
function getDistance(markerLocation){

	let R = 6371000; // metres
	let lat1 = markerLocation.lat*Math.PI/180; //marker 
	let lat2 = userLocation.latitude*Math.PI/180;  //user
	let deltaLat= (lat2-lat1);
	let deltaLong= (userLocation.longitude-markerLocation.lng)*Math.PI/180;

	let a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
		Math.cos(lat1) * Math.cos(lat2) *
		Math.sin(deltaLong/2) * Math.sin(deltaLong/2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	let d = R * c * 0.00062137; //converting to miles;

	return d;
}

//Show an alert with the error of a search call
function displaySearchError(responseText)
{
	app.displayingSearchError = true; //Makes sure the error isn't overwritten
	app.searching = false;
	app.searchAlertText += responseText; 
	app.searchDismissCountdown = app.searchDismissTime;
}