//export {app};


const app = new Vue({
    el: '#root',
    data: {
        searching: false,
        filtersOn: false,
        searchText: 'Search All Local Concerts',
        locationText: '',
        dismissTime: 3,
        dismissCountdown: 0,
        filters: { artist: '', genre: '', range: '', numResults: '' },
        metroID: -1
    },
    methods: {
        search() {
            if (!this.filtersOn) {
                searchAll();
            } else {
                searchFilters();
            }
        },
        toggleFilters() {
            //Not hooked up to v-model of the collapse since it toggles the bool *after* this method is called.
            this.filtersOn = !this.filtersOn;

            if (this.filtersOn) {
                this.searchText = 'Search With Filters';
            } else {
                this.searchText = 'Search All Local Concerts';
            }
        },
        refreshLocation() {
            getLocation();
        }

    }
});

const SONGKICK_KEY = 'D76VyKgAzIw0KqaB';

function searchAll() {
    app.searching = true;
    //If the metroID hasn't been found yet get it and wait for it to be found
    //TODO: store this value in webstorage
    if (app.metroID == -1) {
        getMetroID();
        return;
    }

    let searchQuery = 'https://api.songkick.com/api/3.0/metro_areas/' + app.metroID + '/calendar.json?apikey=' + SONGKICK_KEY;

    fetch(searchQuery)
        .then(response => {
            if (!response.ok) {
                throw Error(`ERROR: ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {

            console.log(json);
            clearMarkers();
            makeMarkers(json);
            app.searching = false;

        })
}

function searchFilters() {
    let artistQuery = 'https://api.songkick.com/api/3.0/search/artists.json?apikey=' + SONGKICK_KEY + '&query=' + this.artist;

    fetch(artistQuery)
        .then(response => {
            if (!response.ok) {
                throw Error(`ERROR: ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {

            console.log(json);

        })
}

function makeMarkers(json) {
    let events = json.resultsPage.results.event;
    console.log(events);
    for (let i = 0; i < events.length - 1; i++) {
        addMarker(events[i]);

    }
}


function getMetroID() {
    let metroQuery = 'https://api.songkick.com/api/3.0/search/locations.json?location=geo:' + userLocation.latitude + ',' + userLocation.longitude + '&apikey=' + SONGKICK_KEY;

    fetch(metroQuery)
        .then(response => {
            if (!response.ok) {
                throw Error(`ERROR: ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {

            app.metroID = json.resultsPage.results.location[0].metroArea.id;

            //Bounce back to the search now that the metro id has been found
            searchAll();
        })
}