var userInput = "";
var idArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var search = function(event) {
    // prevent refresh
    event.preventDefault();
    
    // store user input value
    userInput = $('#city-input').val().trim().toUpperCase();

    // clear input value
    $('#city-input').val('');
      
    // run API Call functions
    eventInfo(userInput);
    newsInfo(userInput);
}

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

// pulls news data from city searched
var newsInfo = function(userInput) {
    var newsUrl = "https://gnews.io/api/v4/search?q=" + userInput + "&lang=en&token=458db7b885eab5f1dca2b9aae7d989b7";
    fetch(newsUrl)
    .then (function(response) {
        // request was successful
        if(response.ok) {
            response.json().then(function(data) {
                createNewsElements(data);
            });
        } 
    });
};

var createEventElements = function (data) {

    // create search results title
    var eventsTitleEl = $('<p>')
        .text('Next events in: ' + userInput)
        .attr('id', 'result-title');

    // append title to events section
    $('#sidebar').append(eventsTitleEl);

        for (i = 0; i < 10; i++) {
            var eventEl = $('<div>')
                .addClass('card')
                .attr('id', 'event-card' + idArr[i]);
        
            $('#sidebar').append(eventEl);
            
            var eventHeaderEl = $('<div>')
                .addClass('cardDivider')
                .attr('id', 'card-header' + idArr[i])
                .text(data._embedded.events[i].name);    
            var eventImageEl = $('<img>')
                .attr('src', data._embedded.events[i].images[0].url)
                .attr('id', 'card-image' + idArr[i]);
            var eventInfo = $('<div>')
                .addClass('card-section')
                .attr('id', 'card-info' + idArr[i])
                .html('<p> Date: ' + data._embedded.events[i].dates.start.localDate + '</p>'
                    + '<p> Venue: ' + data._embedded.events[i]._embedded.venues[0].name + '</p>'
                    + '<a href="' + data._embedded.events[i].url + '">Buy Tickets Now</a>');

            $('#event-card' + idArr[i]).append(eventHeaderEl, eventImageEl, eventInfo);
        };
};

var createNewsElements = function(data) {

    for (i = 0; i < 4; i++) {
        var newsCardEl = $('<div>')
            .addClass('cell flex-container')
            .attr('id', 'news-card-container' + idArr[i]);
        $('.news-card').append(newsCardEl);
        
        var newsEl = $('<div>')
            .addClass('card')
            .attr('id', 'card' +idArr[i]);

        $('#news-card-container' + idArr[i]).append(newsEl);

        var newsHeadlineEl = $('<div>')
            .html('<p>' + data.articles[i].title + '</p>')
            .addClass('bold card-divider');
        var newsImageEl = $('<img>')
            .attr('src', data.articles[i].image)
            .addClass("image-height");
        var newsSourceEl = $('<div>')
            .html('<p class="bold">' + data.articles[i].source.name + '</p>'
                + '<a href=' + data.articles[i].url + '>Click Here to View Article</a>')
            .addClass('card-section');

        $('#card' + idArr[i]).append(newsHeadlineEl, newsImageEl, newsSourceEl);
    };
        // .text(data.articles[i].source.name)
            // .addClass('bold');
        
        // var newsUrlEl = $('<a>')
        //     .attr('href', data.articles[i].url)
        //     .text('Click Here to View Article');

        
     
};

// on submit run search function
$('#nav').on('submit', search);