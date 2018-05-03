"use strict";
const app = new Vue({
	el: '#root',
	data: {
		metroID: -1,
		searching: false,
		filtersOn: false,
		searchText: 'Search All Local Concerts',

		eventsShown: 0,
		eventsCap: 225,
		page: 1,

		displayingSearchError: false,
		searchAlertText: '',
		searchDismissTime: 3,
		searchDismissCountdown: 0,

		locationText: '',
		locationVariant: 'success',
		locDismissTime: 3,
		locDismissCountdown: 0,

		filters: {artist: '', range: null, type: null},

		currentArtistID: -1,
		lastArtistSearch: '',

		rangeOptions: [
			{ value: null, text: "Unlimited Range"},
			{ value: 25, text: "25 miles"},
			{ value: 50, text: "50 miles"},
			{ value: 100, text: "100 miles"},
			{ value: 250, text: "250 miles"},
			{ value: 500, text: "500 miles"}
		],
		typeOptions: [
			{value: null, text: "All Event Types"},
			{value: "Concert", text: "Just Concerts"},
			{value: "Festival", text: "Just Festivals"}
		]
	},
	methods: {
		search() {
			//Reset search
			this.page = 1;
			this.eventsShown = 0;
			this.searchAlertText = '';

			//Get rid of previous error text if it exists
			this.displayingSearchError = false;
			this.searchDismissCountdown = 0;
			if (!this.filtersOn) {
				searchAll();
			} else {
				if(this.filters.artist != '' && this.filters.artist != this.lastArtistSearch)
					searchArtist();
				else
					searchFilters();
			}
		},
		toggleFilters() {
			//Not hooked up to v-model of the collapse since it toggles the bool *after* this method is called.
			this.filtersOn = !this.filtersOn;

			if (this.filtersOn) {
				this.searchText = 'Search With Filters';
			} else {
				//Clear filters
				this.currentArtistID = -1;
				this.lastArtistSearch = '';
				this.searchText = 'Search All Local Concerts';
			}
		},
		refreshLocation() {
			getLocation();
		}

	},
	components:{
		'input-filter':inputFilter,
		'select-filter': selectFilter
	}
});

const SONGKICK_KEY = 'D76VyKgAzIw0KqaB';

function searchAll() {
	//Set the metro id if it hasn't been already
	if(!hasMetroID())
	{
		getMetroID(true); //Search after the ID has been found
		return; //Don't search until its found
	}

	app.searching = true;

	let searchQuery = 'https://api.songkick.com/api/3.0/metro_areas/' + app.metroID + '/calendar.json?apikey=' + SONGKICK_KEY + '&page=' + app.page;

	fetch(searchQuery)
		.then(response => {
		if (!response.ok) {
			if(!app.displayingSearchError)
			{
				app.searchAlertText = "Search All Error: ";
				displaySearchError(response.statusText);
			}
			throw Error(`ERROR: ${response.statusText}`);
		}
		return response.json();
	})
		.then(json => {
		clearMarkers();
		let events = json.resultsPage.results.event;
		for (let i = 0; i < events.length - 1; i++) {
			addMarker(events[i]);

		}

		//Check if another page of results is warranted
		if(app.eventsShown < app.eventsCap && json.resultsPage.totalEntries > app.page * json.resultsPage.perPage)
		{
			app.page++;
			searchAll();
		}
		app.searching = false;

	})
}

function searchFilters() {
	//Set the metro id if it hasn't been already
	if(!hasMetroID())
	{
		getMetroID(true); //Search after the ID has been found
		return;
	}

	app.searching = true;

	let searchQuery = "";

	//Whether to bother searching by artist or not
	if(app.filters.artist == '')
	{
		//Normal Search
		searchQuery = 'https://api.songkick.com/api/3.0/metro_areas/' + app.metroID + '/calendar.json?apikey=' + SONGKICK_KEY;
	}
	else
	{
		//Artist search
		searchQuery = 'http://api.songkick.com/api/3.0/artists/' + app.currentArtistID + '/calendar.json?apikey=' + SONGKICK_KEY;
	}

	fetch(searchQuery)
		.then(response => {
		if (!response.ok) {

			if(!app.displayingSearchError)
			{
				app.searchAlertText = "Filtered Sarch Error: ";
				displaySearchError(response.statusText);
			}
			throw Error(`ERROR: ${response.statusText}`);
		}
		return response.json();
	})
		.then(json => {
		clearMarkers();
		filterEvents(json);
		app.searching=false;
	})
}

//Filter down events by user chosen filters before adding them to the map
function filterEvents(json) {

	let events = json.resultsPage.results.event;
	let eventAdded = false;

	if(!events)
	{
		//Show error if no events return with these filters
		if(!app.displayingSearchError)
			displaySearchError("No events match these filters.");
		return;
	}

	for (let i = 0; i < events.length - 1; i++) 
	{
		//Use "continue" to kick back to the top of the loop when an event is filtered out

		//Check range
		if(app.filters.range != null)
		{
			if(getDistance(events[i].location) >= app.filters.range)
				continue;
		}

		//Check event type
		if(app.filters.type != null)
		{
			if(app.filters.type != events[i].type)
				continue;
		}

		//If all the filters have been worked through, add this event
		addMarker(events[i]);
		eventAdded = true;
	}

	if(!eventAdded)
	{
		//Check if another page of results is warranted
		if(app.eventsShown < app.eventsCap && json.resultsPage.totalEntries > app.page * json.resultsPage.perPage)
		{
			app.page++;
			searchFilters();
		}
		//Show error if no events exist after filtering
		if(!app.displayingSearchError)
			displaySearchError("No events match these filters.");
	}
}