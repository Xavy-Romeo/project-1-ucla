// ticketmaster api key = SanCf9UYURGBDmAfYLJ5r0fOH8G7QqGk
// amadeus hotel api key = 1sL9dFsOmJ6Nc4AVYfANVRFmiQwN41y8
var userInput = "";
var idArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var search = function(event) {
    // prevent refresh
    event.preventDefault();
    
    // store user input value
    userInput = $('#city-input').val().trim().toUpperCase();

    // clear input value
    $('#city-input').val('');
    
    // run function that displays next events
    // createEventElements();
    
    // run API Call function
    eventInfo(userInput);
}

var createEventElements = function (data) {

    // create search results title
    var searchResultTitleEl = $('<p>')
        .text('Next events in: ' + userInput)
        .attr('id', 'result-title');

    // append title to events section
    $('#sidebar').append(searchResultTitleEl);

        for (i = 0; i < 10; i++) {
            var cardEl = $('<div>')
                .addClass('card')
                .attr('id', 'event-card' + idArr[i]);
        
            var cardHeaderEl = $('<div>')
                .addClass('cardDivider')
                .attr('id', 'card-header' + idArr[i])
                .text(data._embedded.events[i].name);    
            var cardImageEl = $('<img>')
                .attr('src', data._embedded.events[i].images[0].url)
                .attr('id', 'card-image' + idArr[i]);
            var cardInfo = $('<div>')
                .addClass('card-section')
                .attr('id', 'card-info' + idArr[i])
                .html('<p> Date: ' + data._embedded.events[i].dates.start.localDate + '</p>'
                    + '<p> Venue: ' + data._embedded.events[i]._embedded.venues[0].name + '</p>'
                    + '<a href="' + data._embedded.events[i].url + '">Buy Tickets Now</a>');

            $('#sidebar').append(cardEl);

            $('#event-card' + idArr[i]).append(cardHeaderEl, cardImageEl, cardInfo);
        }
};

// pulls upcoming events from city searched
var eventInfo = function(userInput) {
    var ticketMasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + userInput + "&apikey=SanCf9UYURGBDmAfYLJ5r0fOH8G7QqGk"
    fetch(ticketMasterUrl)
    .then (function(response) {
        // request was successful
        if(response.ok) {
            response.json().then(function(data) {
                createEventElements(data);
            });
        } 
    });
    
};

// news api fetch if we want to scrap the hotels
var newsInfo = function() {
    var newsUrl = "https://gnews.io/api/v4/search?q=" + userInput + "&lang=en&token=458db7b885eab5f1dca2b9aae7d989b7";
    fetch(newsUrl)
    .then (function(response) {
        // request was successful
        if(response.ok) {
            response.json().then(function(data) {
            for (i = 0; i < 10; i++) {
                var newsHeadLine = data.articles[i].title;
                var newsUrl = data.articles[i].url;
                var newsSource = data.articles[i].source.name;
                var newsImage = data.articles[i].image;
                console.log(newsHeadLine, newsUrl, newsSource, newsImage);
                }
            });
        } 
    });
    
};

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