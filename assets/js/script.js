$(function() {
    $("#page-wrap").wrapInner("<table cellspacing='30'><tr>");
    $(".post").wrap("<td>");
  });

var idArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var random;
var newsContainerEl;
var eventsContainerEl;

var search = function(event) {
    // prevent refresh
    event.preventDefault();

    // store user input value
    cityInput = $('#city-input').val().trim().toUpperCase();

    // clear input value
    $('#city-input').val('');
    
    if (!eventsContainerEl) {
        // run API Call functions
    }
    else {
        // clear previous data function
        clear();
    }

    // run API calls
    eventInfo(cityInput);
    newsInfo(cityInput);
    
    // create random variable
    random = Math.random();
};

// pulls upcoming events from city searched
var eventInfo = function(cityInput) {
    var ticketMasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + cityInput + "&apikey=SanCf9UYURGBDmAfYLJ5r0fOH8G7QqGk"
    fetch(ticketMasterUrl)
    .then (function(eventData) {
        // request was successful
        if(eventData.ok) {
            eventData.json().then(function(eventData) {
                createEventElements(eventData);
            });
        } 
    });
};

// pulls weather data from city searched
var weatherInfo = function(cityInput){
    // hard code weather info; then enter into search function and pass cityInput
    cityInput = 'Hollywood';
    
    // fetch weather coordinates based on cityInput
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=3a01189ad2669a4fe12bba52ee8f9ead&units=imperial';
    fetch(weatherUrl)
    .then(function(weatherData) {
        if(weatherData.ok){
            return weatherData.json();
        }
    })
    .then(function(weatherData){
        fetchWeather(weatherData);             
    });

    var fetchWeather = function(weatherData) {
        // pull lat and lon for new api
        cityLat = weatherData.city.coord.lat;
        cityLon = weatherData.city.coord.lon;

        var weatherForecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&appid=3a01189ad2669a4fe12bba52ee8f9ead&units=imperial';
     
         fetch(weatherForecastUrl)
         .then(function(forecastData){
             return forecastData.json();
         })
         .then(function(forecastData) {
             createForecastElements(forecastData);
         })
     }  
};



// pulls news data from city searched
var newsInfo = function(cityInput) {
    var newsUrl = "https://gnews.io/api/v4/search?q=" + cityInput + "&lang=en&token=458db7b885eab5f1dca2b9aae7d989b7";
    fetch(newsUrl)
    .then (function(newsData) {
        // request was successful
        if(newsData.ok) {
            newsData.json().then(function(newsData) {
                createNewsElements(newsData);
            });
        } 
    });
};

var createEventElements = function (data) {
    eventsContainerEl = $('<section>').attr('id', 'events-container' + random);
    $('#sidebar').append(eventsContainerEl);
    
    // create search results title
    var eventsTitleEl = $('<p>')
        .text('Next events in: ' + cityInput)
        .attr('id', 'result-title');

    // append title to events section
    eventsContainerEl.append(eventsTitleEl);

        // run loop to display 10 events
        for (i = 0; i < 10; i++) {
            // create card for each event
            var eventEl = $('<div>')
                .addClass('card')
                .attr('id', 'event-card' + idArr[i]);
            // append each event card to sidebar
            eventsContainerEl.append(eventEl);
            
            // create event card header
            var eventHeaderEl = $('<div>')
                .addClass('cardDivider event-header')
                .attr('id', 'card-header' + idArr[i])
                .text(data._embedded.events[i].name);    
            // create event card image
            var eventImageEl = $('<img>')
                .attr('src', data._embedded.events[i].images[0].url)
                .attr('id', 'card-image' + idArr[i]);
            // create event card info
            var eventInfo = $('<div>')
                .addClass('card-section')
                .attr('id', 'card-info' + idArr[i])
                .html('<p> Date: ' + data._embedded.events[i].dates.start.localDate + '</p>'
                    + '<p> Venue: ' + data._embedded.events[i]._embedded.venues[0].name + '</p>'
                    + '<a href="' + data._embedded.events[i].url + '">Buy Tickets Now</a>');
            
            // append card elments to each card
            $('#event-card' + idArr[i]).append(eventHeaderEl, eventImageEl, eventInfo);
        };
};

var createForecastElements = function(data) {
    
    console.log('Forecast Data', data);
    // create container to hold Event Cards
    
    var forecastTitleEl = $('<p>').addClass('forecast-title').text('5-Day Forecast');
    var forecastDivEl = $('<div>').addClass('forecast');
    $('#weather').append(forecastTitleEl, forecastDivEl);
    
    var forecastDiv = $('<div>').addClass('forecast-div');
    var forecastDiv1 = $('<div>').addClass('forecast-div');
    var forecastDiv2 = $('<div>').addClass('forecast-div');
    var forecastDiv3 = $('<div>').addClass('forecast-div');
    var forecastDiv4 = $('<div>').addClass('forecast-div');
    forecastDivEl.append(forecastDiv, forecastDiv1, forecastDiv2, forecastDiv3, forecastDiv4);
};

var createNewsElements = function(data) {
    // create news container with random id
    newsContainerEl = $('<div>').attr('id', 'news-container' + random);
    $('#content1').append(newsContainerEl);

    // run loop to display 9 news cards
    for (i = 0; i < 9; i++) {
        // create container for news cards
        newsCardsEl = $('<div>').addClass('grid-x grid-margin-x small-up-1 medium-up-3 news-card');
        // append to content1 section
        newsContainerEl.append(newsCardsEl);
        // create container that holds each news card
        var newsCardEl = $('<div>')
            .addClass('cell flex-container')
            .attr('id', 'news-card-container' + idArr[i]);
        $('.news-card').append(newsCardEl);
        
        // create container to hold each card
        var newsEl = $('<div>')
            .addClass('card')
            .attr('id', 'card' +idArr[i]);
        // append each card to container
        $('#news-card-container' + idArr[i]).append(newsEl);

        // create news headline
        var newsHeadlineEl = $('<div>')
            .html('<p>' + data.articles[i].title + '</p>')
            .addClass('bold card-divider');
        // create news image
        var newsImageEl = $('<img>')
            .attr('src', data.articles[i].image)
            .addClass("image-height");
        // create news source and link
        var newsSourceEl = $('<div>')
            .html('<p class="bold">' + data.articles[i].source.name + '</p>'
                + '<a href=' + data.articles[i].url + '>Click Here to View Article</a>')
            .addClass('card-section');

        // append card elements to each card
        $('#card' + idArr[i]).append(newsHeadlineEl, newsImageEl, newsSourceEl);
    };
};

var clear = function() {
    // clear previous search data
    eventsContainerEl.remove();
    newsContainerEl.remove();
};

// on submit run search function
$('#nav').on('submit', search);

// testing hardcode, then remove function call once done
weatherInfo();

createForecastElements();