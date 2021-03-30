var userInput = '';

var search = function(event) {
    // prevent refresh
    event.preventDefault();
    
    // store user input value
    userInput = $('#city-input').val();
    console.log('userInput', userInput);

    // clear input value
    $('#city-input').val('');
    
    // run API Call function
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