"use strict";
//Represents an event marker and all its data. Includes content string to construct an infowindow.
class Marker{
	constructor(event)
	{	
		this.fullEvent = event;
		this.contentString = "";

		this.position = {lat: event.location.lat, lng: event.location.lng};
		this.title = event.displayName;
		this.uri = event.uri;
		this.performers = event.performance;
		this.type = event.type;
		this.venue = event.venue.displayName;

		//Format time
		this.startTime = event.start.time; //Military time if it exists
		if(this.startTime)
		{
			let hour = parseInt(this.startTime.substr(0, 2));
			if(hour > 12)
			{
				this.startTime = hour % 12 + this.startTime.substr(2) + " PM";
			}
			else
			{
				this.startTime += " AM";
			}
		}
		else
			this.startTime = '';

		//Format Date
		this.date = event.start.date; //YYYY-MM-DD
		this.dateVerbose = ''; //Month Day, Year
		let dateVerboseStart = event.displayName.lastIndexOf('(');
		let dateVerboseEnd = event.displayName.lastIndexOf(')');
		this.dateVerbose = event.displayName.substr(dateVerboseStart + 1, dateVerboseEnd - dateVerboseStart - 1);

		this.constructContent(); //Make the content string that will be used in an infowindow
	}

	addToMap()
	{
		//Do not attempt to place events that have no location
		if(!this.position.lat)
		{
			return;
		}

		this.googleMarker = new google.maps.Marker({position: this.position, map: map});
	}

	//Sets up the content string that is used in the construction of the infowindow
	constructContent()
	{
		//Build the content differently depending on event type
		//Will expand if more types are introduced
		if(this.type == 'Concert'){
			this.buildConcert();
		}
		else if(this.type == 'Festival')
		{
			this.buildFestival();	
		}
	}
	//Helper function to build concert content
	buildConcert()
	{
		//Start values as empty string so that if added to the infowindow empty they will not cause an error.
		let performerText = '';

		//Build list of performers in this event
		performerText = this.performers[0].displayName;
		let performerLength = this.performers.length;

		//More performers
		if(performerLength > 2)
		{
			performerText += ', ';
			for(let i = 1; i < performerLength - 1; i++){

				performerText += this.performers[i].displayName + ', ';

				//Deal with special case of second to last performer listed
				if(i == performerLength - 2){
					performerText += ' and ';
				}
			}
			performerText += this.performers[performerLength - 1].displayName;
		}
		else if(performerLength == 2){
			performerText += ' and ' + this.performers[1].displayName;
		}

		//Venue header separate from this to make sure it only displays on unique markers
		this.contentString = '<h4 class="performers">' + performerText + '</h4>' +
			'<h4>' + this.dateVerbose + '</h4>' +
			'<h5>' + this.startTime + '</h5>' +
			'<a class="eventLink" target="_blank" href="' + this.uri + '">Buy tickets on Songkick</a>';
	}

	//Helper function to build festival content
	buildFestival()
	{
		//Build headliners
		let headlinerText = '';
		let headlinerHeader = '';
		if(this.performers.length > 0)
		{
			headlinerHeader = "Top Headliner";

			if(this.performers.length > 1)
			{
				headlinerHeader += "s: </h5>";

				//Only take the top 3 performers if they exist (some festivals list ALL participants as headliners)
				for(let i = 0; i < 3; i++)
				{
					if(this.performers[i])
					{
						headlinerText += this.performers[i].displayName;

						//Add a comma if this isn't the last one
						if(i != 2)
							headlinerText += ", ";
					}
				}

				if(this.performers.length > 3)
				{
					headlinerText += "<i> and more</i>";
				}

			}
			else //Only one performer listed
			{
				headlinerHeader += ": </h5>";
				headlinerText += this.performers[0].displayName;
			}
		}

		this.contentString = '<h5 class="infoType">' + this.type +'</h5>' + 
			'<h4>' + this.title + '</h4>' +
			'<h5 class="headlineHeader">' + headlinerHeader + '</h5>' +
			'<h5 class="performers">' + headlinerText + '</h5>' +
			'<h5>' + this.startTime + '</h5>' +
			'<a class="eventLink" target="_blank" href="' + this.uri + '">Buy tickets on Songkick</a>'
	}

	//Adds a content string to this marker's content string
	addContent(otherContent)
	{
		this.contentString += '<hr>'; //Add horizontal line
		this.contentString += otherContent;
	}
}