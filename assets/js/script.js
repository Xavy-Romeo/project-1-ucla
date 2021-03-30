// ticketmaster api key = SanCf9UYURGBDmAfYLJ5r0fOH8G7QqGk
// amadeus hotel api key = 1sL9dFsOmJ6Nc4AVYfANVRFmiQwN41y8
var userInput = "";
var idArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var search = function(event) {
    // prevent refresh
    event.preventDefault();
    
    // store user input value
    userInput = $('#city-input').val();

    // clear input value
    $('#city-input').val('');
    
    // run function that displays next events
    createEventElements();
    
    // run API Call function
}

var createEventElements = function () {
    // create search results title
    var searchResultTitleEl = $('<p>')
        .text('Next events for ' + userInput)
        .attr('id', 'result-title');
  
    // container to hold upcoming events
    var searchResultsContainerEl = $('<div>').attr('id', 'search-results-container');
  
    // append elements to sidebar
    $('#sidebar').append(searchResultTitleEl, searchResultsContainerEl);

    // loop to create upcoming events (maximum of 8) 
    for (i = 0; i < 8; i++) {
        // create div for each event
        var eventResultsEl = $('<div>').attr('id', 'event-results' + idArr[i]);
        
        $('#search-results-container').append(eventResultsEl);
    
        // create search result elements
        var dateEl = $('<p>')
            .attr('id', 'date' + idArr[i])
            .text('date' + idArr[i] );
        var timeEl = $('<p>')
            .attr('id', 'time' + idArr[i])
            .text('time' + idArr[i]);
        var cityEl = $('<p>')
            .attr('id', 'city' + idArr[i])
            .text('city' + idArr[i]);
        var venueEl = $('<p>')
            .attr('id', 'venue' + idArr[i])
            .text('venue' + idArr[i]);
        
        $('#event-results' + idArr[i]).append(dateEl, timeEl, cityEl, venueEl);
    };
};

// pulls next 8 upcoming events from city searched
var eventInfo = function() {
    var ticketMasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + userInput + "&apikey=SanCf9UYURGBDmAfYLJ5r0fOH8G7QqGk"
    fetch(ticketMasterUrl)
    .then (function(response) {
        // request was successful
        if(response.ok) {
            response.json().then(function(data) {
            for (i = 0; i < 8; i++) {
                    var tmEvent = data._embedded.events[i].name;
                    var tmDate = data._embedded.events[i].dates.start.localDate;
                    var tmVenue = data._embedded.events[i]._embedded.venues[0].name;
                    // can add more event info if desired
                    console.log(tmEvent, tmDate, tmVenue);
                }
            });
        } 
    });
    
};

var hotelInfo = function() {
    var hotelApi = "https://hotels4.p.rapidapi.com/locations/search?query=" + userInput + "&locale=en_US";
    fetch(hotelApi, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4da98aa17amshf3cf8e4c6ea8b8ep17fd5djsn80f88772eda8",
		"x-rapidapi-host": "hotels4.p.rapidapi.com"
	}
})
    .then (function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                for (i = 0; i < 3; i++) {
                    var hotels = data.suggestions[1].entities[i].name;
                    console.log(hotels);
                }
            })
        }
    })
}


// on submit run search function
$('#nav').on('submit', search);



    // 1 - Get User Input
    //     * store in var userInput on submit
    //     * pass userInput to Ticketmaster API

    // 2 - Run TicketMaster API
    //     * pass in userInput
    //     * run fetch request
    //     * pass fetch response to create next events function

    // 3 - Show Next 5 (or number of choice) events function
    //     * Title = display artist/group name
    //     * for loop getting ticketMaster API response
    //         > creates DOM elements for each event
    //         > display event info for each event
    //             a)  date
    //             b)  time
    //             c)  city
    //             d)  venue
    
    // 4 - On click of one of the events function
    //     * get response data and pass data to Hotel API
    //         > add id to each event and attach event listener to each
    
    // 5 - function display 10(or number of choice) closest hotels
    //     * for loop creating 10 divs for each hotel
    //     * Display hotel and distance from venue
    
    // 6 - on click of hotel choice open a second page with hotel booking site

    // 7 - scroll down for user (filter choices)
    //     * by distance to venue
    //     * by stars
    //     * by price