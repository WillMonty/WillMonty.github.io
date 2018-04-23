//For google maps or location code

let map;
let infowindow;
let markers=[] //Array of all current markers
let userLocation = {latitude: 43.083848, longitude: -77.6799};
let locationMsg = "Location Found"; //Msg to return after getting location

function initMap() {
    let mapOptions = {
        center: {lat:43.083848, lng:-77.6799},
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    getLocation(); //Try to get user's location
}

function addMarker(event) {
    let position = {lat:event.location.lat, lng:event.location.lng};

    //Do not attempt to place events that have no location
    if(!position.lat)
    {
        return;
    }

    let marker = new google.maps.Marker({position: position, map: map});
    marker.setTitle(event.displayName);
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function(e){
        makeInfoWindow(position, event);
    });
}

function clearMarkers()
{
    if(infowindow) 
        infowindow.close();
    
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers =[];
}

//TODO: How to make multiple events at the same marker? I.E Multiple events at the same venue
function makeInfoWindow(position, event){
    if(infowindow) infowindow.close();

    //Start values as empty string so that if added to the infowindow empty they will not cause an error.
    let performers = '';
    let dateVerbose = '';
    let time = '';
    let venue = '';
    let uri = '';

    if(event.type == 'Concert'){

        performers = event.performance[0].displayName;
        let performerLength = event.performance.length;

        //More performers
        if(performerLength > 2)
        {
            performers += ', ';
            for(let i = 1; i < performerLength - 1; i++){

                performers += event.performance[i].displayName + ', ';

                //Deal with special case of second to last performer listed
                if(i == performerLength - 2){
                    performers += ' and ';
                }
            }
            performers += event.performance[performerLength - 1].displayName;
        }
        else if(performerLength == 2){
            performers += ' and ' + event.performance[1].displayName;
        }

        let dateVerboseStart = event.displayName.lastIndexOf('(');
        let dateVerboseEnd = event.displayName.lastIndexOf(')');
        dateVerbose = event.displayName.substr(dateVerboseStart + 1, dateVerboseEnd - dateVerboseStart - 1);

        venue = event.venue.displayName;
    }
    else if(event.type == 'Festival'){

    }

    uri = event.uri;

    console.log(event);

    infowindow = new google.maps.InfoWindow({
        map: map,
        position: position,
        content: '<h3>' + performers + '</h3>' +
        '<h4>' + venue + '</h4>' +
        '<h4>' + dateVerbose + '</h4>' +
        '<a href="' + uri + '">More details on Songkick</a>'
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

            map.setCenter({lat: userLocation.latitude, lng:userLocation.longitude});

            app.locationText = "Location found";
            app.dismissCountdown = app.dismissTime;
        }, handleLocationError);

    }
    else //Location not allowed by device
    {
        app.locationText = "Request unsupported";
        app.dismissCountdown = app.dismissTime;
    }
}

//Handled errors thrown by the location attempt
function handleLocationError(error)
{
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
    app.dismissCountdown = app.dismissTime;
}